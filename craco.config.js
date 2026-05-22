const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {

              '@primary-color': '#e96b28', // primary color for all components
              '@secondary-color': '#ab411c', // primary color for all components
              '@link-color': '#e96b28', // link color

              // '@primary-color': '#022179', // primary color for all components
              // '@secondary-color': '#a42593', // primary color for all components
              // '@link-color': '#022179', // link color

              // '@primary-color': '#3162b0', // primary color for all components
              // '@secondary-color': '#1890ff', // primary color for all components
              // '@link-color': '#3162b0', // link color


              '@success-color': '#52c41a', // success state color
              '@warning-color': '#faad14', // warning state color
              '@error-color': '#f5222d', // error state color
              '@font-size-base': '14px', // major text font size
              '@heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
              '@text-color': '#04223e', // major text color
              '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
              '@disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color
              '@border-radius-base': '4px', // major border radius
              '@border-color-base': '#d9d9d9', // major border color
              '@box-shadow-base': '0 3px 6px - 4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)', // major shadow for layers
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};