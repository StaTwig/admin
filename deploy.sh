#!/bin/bash

#Chekcing arguments
if [ $# -eq 0 ];
  then
    echo "Please choose the mode: PROD TEST LOCAL ABINBEV"
    echo "Followed by the sercices: FRONTEND GATEWAY SERVICESI SERVICESII ALL"
    echo "SERVICESI - shipping_service	 inventory_service	track_trace		user_service products_service"
    echo "SERVICESII - blockchain_service	log_service alert_service notification_service rbac_service"
    exit

else
   echo "Executing script in $1 mode for $2 service..."
fi


#Creating env variables
echo "Creating Env variables .... "

if [ "$1" == "PROD" ] && ([ "$2" == "SERVICESI" ] || [ "$2" == "SERVICESII" ]);
   then
      ./pre-deploy-prod.sh

elif [ "$1" == "TEST" ];
   then 
      ./pre-deploy-test.sh

elif [ "$1" == "DEMO" ];
   then
      ./pre-deploy-demo.sh

elif [ "$1" == "PROD" ];
   then
      ./pre-deploy-prod.sh

elif [ "$1" == "ABINBEV" ];
   then
      ./pre-deploy-abinbev.sh

else
   ./pre-deploy.sh

fi

#starting backend services


cd backend

if [ "$1" == "PROD" ] && [ "$2" == "SERVICESI" ]
   then
      rm -rf blockchain_service	log_service alert_service notification_service rbac_service

elif [ "$1" == "PROD" ] && [ "$2" == "SERVICESII" ]
   then
      rm -rf shipping_service	transaction_service inventory_service	track_trace		user_service products_service

fi

if ([ "$1" == "PROD" ] || [ "$1" == "TEST" ] || [ "$1" == "DEMO" ] || [ "$1" == "ABINBEV" ]) && ([ "$2" == "SERVICESI" ] || [ "$2" == "SERVICESII" ] || [ "$2" == "ALL" ]);
   then
      cd -P .
      for dir in ./*/
         do cd -P "$dir" ||continue
            echo "starting $PWD "
            printf %s\\n "$PWD" >&2
            npm install && pm2 start && pm2 save && cd "$OLDPWD" || 
         ! break; done || ! cd - >&2

elif [ "$1" == "LOCAL" ]
   then
      cd -P .
      for dir in ./*/
         do cd -P "$dir" ||continue
            printf %s\\n "$PWD" >&2
            npm install && cd "$OLDPWD" || 
         ! break; done || ! cd - >&2
fi

cd ..

echo $(pwd)

#start frontend
echo "Building frontend"
cd frontend
: <<'END'
if ([ "$1" == "PROD" ] || [ "$1" == "TEST" ] || [ "$1" == "ABINBEV" ]) && ([ "$2" == "FRONTEND" ] || [ "$2" == "ALL" ]);
   then
      echo "Building frontend in $1 mode....."
      sudo systemctl stop nginx
      sudo rm -rf /var/www/html/dist /var/wwww/html/index.html
      npm install

      if [ "$1" == "PROD" ];
         then
            echo "Building frotend for PROD enviornment......"
            ENVIRONMENT=prod npm run build
      else
         echo "Building frotend for TESt enviornment......"
         ENVIRONMENT=test npm run build
      fi
      
      sudo cp -r dist /var/www/html/
      sudo cp index.html /var/www/html/
      sudo systemctl start nginx
      sudo systemctl status nginx

elif [ "$1" == "LOCAL" ] && [ "$2" == "FROTNEND" ]
   then
      echo "Building and starting forntend in local mode...."
      npm install
      npm run build
      #npm start &

fi
END
cd ..

#start api gateway - traefik
if ([ "$2" == "GATEWAY" ] || [ "$2" == "ALL" ]);
   then
      killall traefik
      cd apigateway
      echo $(pwd)
      
      if [ "$1" == "PROD" ]
         then
            echo "Starting traefik in PROD mode ......"
            traefik --configFile=traefik-cloud-prod-api.yml &
      
      elif [ "$1" == "TEST" ]
         then
            echo "Starting traefik in TEST mode ......"
            traefik --configFile=traefik-cloud-dev-api.yml &
      
      elif [ "$1" == "DEMO" ]
         then
            echo "Starting traefik in DEMO mode ......"
            traefik --configFile=traefik-cloud-demo-api.yml &
            
      elif [ "$1" == "ABINBEV" ]
         then
            echo "Starting traefik in ABINBEV mode ......"
            traefik --configFile=traefik-cloud-abinbev-api.yml &
      
      fi

fi

cd ..

echo $(pwd)
pm2 status
