import React, { lazy, useEffect, useState } from 'react';
import shortid from 'shortid';

const importView = (componentName, moduleName) =>
    lazy(() =>
        import(`./views/${moduleName}/${componentName}`).catch(() => import(`./views/NotFound`))
    );

const componentMappings = [
    {
        componentName: 'GeographicalView',
        componentCode: 'ANNUALREPORT_DASHBOARD',
        moduleName: 'annualReport'
    },
    {
        componentName: 'DetailedGeographicalView',
        componentCode: 'DETAILED_GEO_VIEW',
        moduleName: 'annualReport'
    },
    {
        componentName: 'SKUView',
        componentCode: 'SKU_VIEW',
        moduleName: 'annualReport'
    },
    {
        componentName: 'SupplierView',
        componentCode: 'SUPPLIER_VIEW',
        moduleName: 'annualReport'
    },
    {
        componentName: 'BreweryView',
        componentCode: 'BREWERY_VIEW',
        moduleName: 'annualReport'
    },
    {
        componentName: 'SKUDetailView',
        componentCode: 'SKU_DETAIL_VIEW',
        moduleName: 'annualReport'
    },
    {
        componentName: 'InventoryDashboard',
        componentCode: 'INVENTORY_DASHBOARD',
        moduleName: 'Inventory'
    },
    {
        componentName: 'SpmDashboard',
        componentCode: 'SPM_DASHBOARD',
        moduleName: 'SPM'    
    }
];


export default function ViewRenderer(props) {
    const [views, setViews] = useState([]);

    useEffect(() => {
        function loadViews() {
            let componentsToRender = [];
            componentsToRender = componentMappings.filter(component => {
                return component.componentCode === props.viewName;
            });
            console.log(componentsToRender);
            if (!componentsToRender.length) {
                componentsToRender.push({ componentName: 'NotFound' });
            }
            const componentPromises = componentsToRender.map(async data => {
                console.log(data.componentName);
                const View = await importView(data.componentName,data.moduleName);
                return <View key={shortid.generate()} {...props} />;
            });
            Promise.all(componentPromises).then(setViews);
        }
        loadViews();
    }, [props]);

    return (
        <>
            <React.Suspense fallback="Loading Component Views..." >
                <div>{views}</div>
            </React.Suspense>
        </>
    );
}
