const product = {
  app_name: 'Authentic-EP',
  app_title: 'Authentic-EP',
  appClients: 'authenticLifeCare',
  brandName: 'Innotech Cloud',
  brandURL: 'https://innotechcloud.com/'
}

// const product = {
//   app_name: 'Block EMS',
//   app_title: 'Block EMS',
//   appClients: 'theBPOGroup',
//   brandName : 'The BPO Group',
//   brandURL: 'https://thebpogroup.com.au/'
// }

const INITIAL_STATE = {
  showLoginScreen: false,
  app_data: {
    app_name: product.app_name,
    app_title: product.app_title,
    logo_h: 'product-logopsd-h.png',
    logo_h_w: 'product-logopsd-h-w.png',
    logo_v: 'product-logopsd-v.png',
    logo_v_w: 'product-logopsd-v-w.png',
    blockHTML: '<h1>Blocked</h1>',
    blockStatus: false,
    maintenanceHTML: '<h1>Maintenance</h1>',
    maintenanceStatus: false,
    version: '1.0',
    appClients: product.appClients,
  },
  developedByRouteName: 'developedBy',
  company_data: {
    authenticLifeCare: {
      name: 'Authentic Life Care',
      webLink: 'http://authenticlifecare.com.au/',
      webDomain: 'authenticlifecare.com.au',
      logo: 'logo.png',
      loginScreenType: 2,
    },
    theBPOGroup: {
      name: 'The BPO Group',
      webLink: 'http://thebpogroup.com.au/',
      webDomain: 'thebpogroup.com.au',
      logo: 'logo.png',
      loginScreenType: 2,
    }
  },
  brand: {
    name: product.brandName,
    url: product.brandURL,
    url_contact_us: product.brandURL + 'contact-us',
    url_about_us: product.brandURL + 'about-us',
    logo: 'brand-logo.png',
    logo_w: 'brand-logo-w.png',
    icon: 'brand-ico.png',
    dev_name: 'Kashif Fazal',
    dev_url: 'https://www.innotechcloud.com/kashiffazal'
  },

  /*Other app values*/
  ud: {},
  sideNavMenu: null,
  notify_ticket_list: {},
  notify_ticket_count: '',
}

const Data = (states = INITIAL_STATE, action) => {
  var res = { ...states };
  res[action.type] = action.payload;
  return (res ? res : states);
}

export default Data;

