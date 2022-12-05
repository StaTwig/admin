import React, { lazy, useEffect, useState } from 'react';
import shortid from 'shortid';

const importView = (componentName, moduleName) =>
  lazy(() =>
    import(`./views/${moduleName}/${componentName}`).catch(() =>
      import(`./views/NotFound`),
    ),
  );

const componentMappings = [
  {
    componentName: 'GeographicalView',
    componentCode: 'ANNUALREPORT_DASHBOARD',
    moduleName: 'annualReport',
  },
  {
    componentName: 'DetailedGeographicalView',
    componentCode: 'DETAILED_GEO_VIEW',
    moduleName: 'annualReport',
  },
  {
    componentName: 'SKUView',
    componentCode: 'SKU_VIEW',
    moduleName: 'annualReport',
  },
  {
    componentName: 'SupplierView',
    componentCode: 'SUPPLIER_VIEW',
    moduleName: 'annualReport',
  },
  {
    componentName: 'BreweryView',
    componentCode: 'BREWERY_VIEW',
    moduleName: 'annualReport',
  },
  {
    componentName: 'SKUDetailView',
    componentCode: 'SKU_DETAIL_VIEW',
    moduleName: 'annualReport',
  },
  {
    componentName: 'geographicalDetails',
    componentCode: 'INVENTORY_GRAPHICAL',
    moduleName: 'Inventory',
  },
  {
    componentName: 'skuView',
    componentCode: 'INVENTORY_SKU',
    moduleName: 'Inventory',
  },
  {
    componentName: 'skuViewDetails',
    componentCode: 'INVENTORY_SKU_DETAILS',
    moduleName: 'Inventory',
  },
  {
    componentName: 'InventoryDashboard',
    componentCode: 'INVENTORY_DASHBOARD',
    moduleName: 'Inventory',
  },
  {
    componentName: 'SpmDashboard',
    componentCode: 'SPM_DASHBOARD',
    moduleName: 'SPM',
  },
  {
    componentName: 'SpmDashboardDetails',
    componentCode: 'SPM_DASHBOARD_DETAILS',
    moduleName: 'SPM',
  },
  {
    componentName: 'BreweryDetailedView',
    componentCode: 'BREWERY_DETAIL_VIEW',
    moduleName: 'annualReport',
  },
  {
    componentName: 'DetailedSupplierView',
    componentCode: 'SUPPLIER_DETAIL_VIEW',
    moduleName: 'annualReport',
  },
];

export default function ViewRenderer(props) {
  const [views, setViews] = useState([]);

  useEffect(() => {
    function loadViews() {
      let componentsToRender = [];
      componentsToRender = componentMappings.filter((component) => {
        return component.componentCode === props.viewName;
      });
      if (!componentsToRender.length) {
        componentsToRender.push({ componentName: 'NotFound' });
      }
      const componentPromises = componentsToRender.map(async (data) => {
        const View = await importView(data.componentName, data.moduleName);
        return <View key={shortid.generate()} {...props} />;
      });
      Promise.all(componentPromises).then(setViews);
    }
    loadViews();
  }, [props]);

  return (
    <>
      <React.Suspense fallback="Loading Component Views...">
        <div>{views}</div>
      </React.Suspense>
    </>
  );
}
