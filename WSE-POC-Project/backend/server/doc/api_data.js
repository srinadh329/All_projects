define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "C__Users_dell_Documents_GitHub_Projects_fx_backend_server_doc_main_js",
    "groupTitle": "C__Users_dell_Documents_GitHub_Projects_fx_backend_server_doc_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/Purpose",
    "title": "TO GET THE purposes.",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "getPurposes",
    "group": "DDL",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "array",
            "description": "<p>of matched common parameters.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-Not",
            "description": "<p>Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/ddl/ddl.controller.js",
    "groupTitle": "DDL"
  },
  {
    "type": "get",
    "url": "/banks",
    "title": "ALL banks information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "getBanks",
    "group": "banks_and_customers",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Lists of the banks.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/banks_and_cutomers/banks_and_cutomers.controller.js",
    "groupTitle": "banks_and_customers"
  },
  {
    "type": "get",
    "url": "/customers",
    "title": "to get customers information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "getCustomers",
    "group": "banks_and_customers",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Lists of the cutsomers.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/banks_and_cutomers/banks_and_cutomers.controller.js",
    "groupTitle": "banks_and_customers"
  },
  {
    "type": "post",
    "url": "/banks_and_cutomers",
    "title": "create banks_and_cutomers record.",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "create",
    "group": "banks_and_cutomers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>ALL fields will send through the client server (update in future).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of created banks_and_cutomers.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/banks_and_cutomers/banks_and_cutomers.controller.js",
    "groupTitle": "banks_and_cutomers"
  },
  {
    "type": "delete",
    "url": "/banks_and_cutomers/:id",
    "title": "Delete banks_and_cutomers record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "destroy",
    "group": "banks_and_cutomers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "Will",
            "description": "<p>send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Deleted",
            "description": "<ul> <li>NO Content.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/banks_and_cutomers/banks_and_cutomers.controller.js",
    "groupTitle": "banks_and_cutomers"
  },
  {
    "type": "get",
    "url": "/banks_and_cutomers",
    "title": "ALL banks_and_cutomerss information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "index",
    "group": "banks_and_cutomers",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Lists of the banks_and_cutomers.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/banks_and_cutomers/banks_and_cutomers.controller.js",
    "groupTitle": "banks_and_cutomers"
  },
  {
    "type": "get",
    "url": "/banks_and_cutomers/:id",
    "title": "Request banks_and_cutomers information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "show",
    "group": "banks_and_cutomers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "Will",
            "description": "<p>send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of particular banks_and_cutomers.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/banks_and_cutomers/banks_and_cutomers.controller.js",
    "groupTitle": "banks_and_cutomers"
  },
  {
    "type": "put",
    "url": "/banks_and_cutomers/:id",
    "title": "Update banks_and_cutomers record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "update",
    "group": "banks_and_cutomers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "Will",
            "description": "<p>send through the url parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Need to Update fields will send through the client server (update in future).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of updated banks_and_cutomers.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/banks_and_cutomers/banks_and_cutomers.controller.js",
    "groupTitle": "banks_and_cutomers"
  },
  {
    "type": "post",
    "url": "/currencies",
    "title": "product wise ALL banks information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "ProductCurrencies",
    "group": "currency_rates",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "BRNID",
            "description": "<p>Branch</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(15)",
            "optional": false,
            "field": "PRDID",
            "description": "<p>Product</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Lists of the currencies.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/currency_rates/currency_rates.controller.js",
    "groupTitle": "currency_rates"
  },
  {
    "type": "post",
    "url": "/currency_rates",
    "title": "create currency_rates record.",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "create",
    "group": "currency_rates",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>ALL fields will send through the client server (update in future).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of created currency_rates.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/currency_rates/currency_rates.controller.js",
    "groupTitle": "currency_rates"
  },
  {
    "type": "delete",
    "url": "/currency_rates/:id",
    "title": "Delete currency_rates record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "destroy",
    "group": "currency_rates",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "CCYID",
            "description": "<p>Will send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Deleted",
            "description": "<ul> <li>NO Content.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/currency_rates/currency_rates.controller.js",
    "groupTitle": "currency_rates"
  },
  {
    "type": "post",
    "url": "/Exchange",
    "title": "rates currency wise information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "gettingRates",
    "group": "currency_rates",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "CHAR(15)",
            "optional": false,
            "field": "PRDID",
            "description": "<p>Product</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "BRNID",
            "description": "<p>Branch</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(3)",
            "optional": false,
            "field": "CCYID",
            "description": "<p>Currency</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "EXRSID",
            "description": "<p>Exchange rate set id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Lists of the rates.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/currency_rates/currency_rates.controller.js",
    "groupTitle": "currency_rates"
  },
  {
    "type": "get",
    "url": "/currency_rates",
    "title": "ALL currency_ratess information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "index",
    "group": "currency_rates",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Lists of the currency_rates.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/currency_rates/currency_rates.controller.js",
    "groupTitle": "currency_rates"
  },
  {
    "type": "get",
    "url": "/currency_rates/:id",
    "title": "Request currency_rates information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "show",
    "group": "currency_rates",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "CCYID",
            "description": "<p>Will send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of particular currency_rates.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/currency_rates/currency_rates.controller.js",
    "groupTitle": "currency_rates"
  },
  {
    "type": "put",
    "url": "/currency_rates/:id",
    "title": "Update currency_rates record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "update",
    "group": "currency_rates",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "CCYID",
            "description": "<p>Will send through the url parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Need to Update fields will send through the client server (update in future).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of updated currency_rates.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/currency_rates/currency_rates.controller.js",
    "groupTitle": "currency_rates"
  },
  {
    "type": "post",
    "url": "/ddltrn",
    "title": "create ddl record.",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "create",
    "group": "ddl",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "DECIMAL(11)",
            "optional": false,
            "field": "TRNDLNK",
            "description": "<p>DUE UNIQUE ID</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(11)",
            "optional": false,
            "field": "TRNTRID",
            "description": "<p>TRANSACTION ID</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(3)",
            "optional": false,
            "field": "TRNCNID",
            "description": "<p>BRANCH CNTRY ID</p>"
          },
          {
            "group": "Parameter",
            "type": "NUMERIC(3)",
            "optional": false,
            "field": "TRNBRID",
            "description": "<p>BRANCH ID</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(15)",
            "optional": false,
            "field": "TRNPRID",
            "description": "<p>PRODUCT ID</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "TRNCSID",
            "description": "<p>CASHIER ID</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "TRNDOCN",
            "description": "<p>DOCUMENT NO</p>"
          },
          {
            "group": "Parameter",
            "type": "DATE",
            "optional": false,
            "field": "TRNTRDT",
            "description": "<p>TRANSACTION DATE</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(1)",
            "optional": false,
            "field": "TRNMTPY",
            "description": "<p>0=CASH,1=CHEQUE</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(15)",
            "optional": false,
            "field": "TRNCQNO",
            "description": "<p>CHEQUE NUMBER</p>"
          },
          {
            "group": "Parameter",
            "type": "DATE",
            "optional": false,
            "field": "TRNCQDT",
            "description": "<p>CHEQUE DATE</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(30)",
            "optional": false,
            "field": "TRNCQDL",
            "description": "<p>CHEQUE DETAILS</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(1)",
            "optional": false,
            "field": "TRNIWOW",
            "description": "<p>0=OUTWARD,1=IN/W</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(50)",
            "optional": false,
            "field": "TRNRMPR",
            "description": "<p>REMITT.PURPOSE</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(14)",
            "optional": false,
            "field": "TRNTAMT",
            "description": "<p>TOTAL AMOUNT</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(3)",
            "optional": false,
            "field": "TRNAMCY",
            "description": "<p>AMT IN CURRENCY</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "TRNRMID",
            "description": "<p>REMITTER ID</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "TRNRGCN",
            "description": "<p>GOLD CARD NUMBER</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(120)",
            "optional": false,
            "field": "TRNRMNM",
            "description": "<p>REMITTER NAME</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(40)",
            "optional": false,
            "field": "TRNRMA1",
            "description": "<p>ADDRESS...1</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(40)",
            "optional": false,
            "field": "TRNRMA2",
            "description": "<p>ADDRESS...2</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(40)",
            "optional": false,
            "field": "TRNRMA3",
            "description": "<p>ADDRESS...3</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(5)",
            "optional": false,
            "field": "TRNRCTY",
            "description": "<p>CITY ID</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(2)",
            "optional": false,
            "field": "TRNRSID",
            "description": "<p>STATE ID</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(3)",
            "optional": false,
            "field": "TRNRCID",
            "description": "<p>COUNTRY ID</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(30)",
            "optional": false,
            "field": "TRNRNAT",
            "description": "<p>NATIONALITY</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(15)",
            "optional": false,
            "field": "TRNRIDN",
            "description": "<p>IDENTIFICATION</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(2)",
            "optional": false,
            "field": "TRNRIDT",
            "description": "<p>ID TYPE</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(5)",
            "optional": false,
            "field": "TRNBMID",
            "description": "<p>BENEFICIARY SR NO</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(120)",
            "optional": false,
            "field": "TRNBMNM",
            "description": "<p>BENEFICIARY NAME</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(40)",
            "optional": false,
            "field": "TRNBMA1",
            "description": "<p>ADDRESS...1</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(40)",
            "optional": false,
            "field": "TRNBMA2",
            "description": "<p>ADDRESS...2</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(40)",
            "optional": false,
            "field": "TRNBMA3",
            "description": "<p>ADDRESS...3</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(5)",
            "optional": false,
            "field": "TRNBCTY",
            "description": "<p>CITY ID</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(2)",
            "optional": false,
            "field": "TRNBSID",
            "description": "<p>STATE ID</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(3)",
            "optional": false,
            "field": "TRNBCID",
            "description": "<p>COUNTRY ID</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(30)",
            "optional": false,
            "field": "TRNBNAT",
            "description": "<p>NATIONALITY</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(15)",
            "optional": false,
            "field": "TRNBIDN",
            "description": "<p>IDENTIFICATION</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(2)",
            "optional": false,
            "field": "TRNBIDT",
            "description": "<p>ID TYPEID TYPE</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(35)",
            "optional": false,
            "field": "TRNACNO",
            "description": "<p>ACCOUNT NUMBER</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(50)",
            "optional": false,
            "field": "TRNBKDT",
            "description": "<p>BANK DETAILS</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(50)",
            "optional": false,
            "field": "TRNREMK",
            "description": "<p>REMARKS</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(1)",
            "optional": false,
            "field": "TRNRSTA",
            "description": "<p>RECORD STATUS.0/1</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "TRNCUSR",
            "description": "<p>CREATED BY</p>"
          },
          {
            "group": "Parameter",
            "type": "DATE",
            "optional": false,
            "field": "TRNCDTE",
            "description": "<p>CREATED DATE</p>"
          },
          {
            "group": "Parameter",
            "type": "TIME",
            "optional": false,
            "field": "TRNCTME",
            "description": "<p>CREATED TIME</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "TRNUUSR",
            "description": "<p>UPDATED BY</p>"
          },
          {
            "group": "Parameter",
            "type": "DATE",
            "optional": false,
            "field": "TRNUDTE",
            "description": "<p>UPDATED DATE</p>"
          },
          {
            "group": "Parameter",
            "type": "TIME",
            "optional": false,
            "field": "TRNUTME",
            "description": "<p>UPDATED TIME</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(1)",
            "optional": false,
            "field": "TRNDELF",
            "description": "<p>DELETION FLAG</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>ALL fields will send through the client server (update in future).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of created ddl.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/ddl/ddl.controller.js",
    "groupTitle": "ddl"
  },
  {
    "type": "delete",
    "url": "/ddl/:id",
    "title": "Delete ddl record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "destroy",
    "group": "ddl",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "TRNDLNK",
            "description": "<p>Will send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Deleted",
            "description": "<ul> <li>NO Content.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/ddl/ddl.controller.js",
    "groupTitle": "ddl"
  },
  {
    "type": "get",
    "url": "/ddl",
    "title": "ALL ddls information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "index",
    "group": "ddl",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Lists of the ddl.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/ddl/ddl.controller.js",
    "groupTitle": "ddl"
  },
  {
    "type": "get",
    "url": "/ddl/:id",
    "title": "Request ddl information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "show",
    "group": "ddl",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "TRNDLNK",
            "description": "<p>Will send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of particular ddl.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/ddl/ddl.controller.js",
    "groupTitle": "ddl"
  },
  {
    "type": "put",
    "url": "/ddl/:id",
    "title": "Update ddl record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "update",
    "group": "ddl",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "TRNDLNK",
            "description": "<p>Will send through the url parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Need to Update fields will send through the client server (update in future).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of updated ddl.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/ddl/ddl.controller.js",
    "groupTitle": "ddl"
  },
  {
    "type": "post",
    "url": "/narration",
    "title": "create narration record.",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "create",
    "group": "narration",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>ALL fields will send through the client server (update in future).</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(11)",
            "optional": false,
            "field": "NARLNK",
            "description": "<p>Narration Link</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "NARSNO",
            "description": "<p>Sequence</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(1)",
            "optional": false,
            "field": "NARTYP",
            "description": "<p>Line Type</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(70)",
            "optional": false,
            "field": "NARTXT",
            "description": "<p>Text</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of created narration.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/narration/narration.controller.js",
    "groupTitle": "narration"
  },
  {
    "type": "delete",
    "url": "/narration/:id",
    "title": "Delete narration record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "destroy",
    "group": "narration",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "narlnk",
            "description": "<p>Will send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Deleted",
            "description": "<ul> <li>NO Content.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/narration/narration.controller.js",
    "groupTitle": "narration"
  },
  {
    "type": "get",
    "url": "/narration",
    "title": "ALL narrations information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "index",
    "group": "narration",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Lists of the narration.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/narration/narration.controller.js",
    "groupTitle": "narration"
  },
  {
    "type": "get",
    "url": "/narration/:id",
    "title": "Request narration information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "show",
    "group": "narration",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "narlnk",
            "description": "<p>Will send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of particular narration.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/narration/narration.controller.js",
    "groupTitle": "narration"
  },
  {
    "type": "put",
    "url": "/narration/:id",
    "title": "Update narration record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "update",
    "group": "narration",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "narlnk",
            "description": "<p>Will send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of updated narration.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/narration/narration.controller.js",
    "groupTitle": "narration"
  },
  {
    "type": "post",
    "url": "/trndet",
    "title": "create trndet record.",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "create",
    "group": "trndet",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "DECIMAL(11)",
            "optional": false,
            "field": "DETLNK",
            "description": "<p>Tran Details Link</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "DETSNO",
            "description": "<p>Sequence</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(3)",
            "optional": false,
            "field": "LINTYP",
            "description": "<p>Line Type</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(3)",
            "optional": false,
            "field": "CCYID",
            "description": "<p>Currency</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(1)",
            "optional": false,
            "field": "BUYSEL",
            "description": "<p>Buy/Sell</p>"
          },
          {
            "group": "Parameter",
            "type": "NUMERIC(13)",
            "optional": false,
            "field": "FCAMT",
            "description": "<p>FC Amount</p>"
          },
          {
            "group": "Parameter",
            "type": "NUMERIC(13)",
            "optional": false,
            "field": "LCAMT",
            "description": "<p>LC Amount</p>"
          },
          {
            "group": "Parameter",
            "type": "NUMERIC(17)",
            "optional": false,
            "field": "EXRATE",
            "description": "<p>Rate</p>"
          },
          {
            "group": "Parameter",
            "type": "NUMERIC(5)",
            "optional": false,
            "field": "PRCENT",
            "description": "<p>Percentage</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(1)",
            "optional": false,
            "field": "MULDVD",
            "description": "<p>Multiply/Divide</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(3)",
            "optional": false,
            "field": "DTLSTS",
            "description": "<p>Deal Line Status</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "DLTKT",
            "description": "<p>Deal Ticket</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of created trndet.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trndet/trndet.controller.js",
    "groupTitle": "trndet"
  },
  {
    "type": "delete",
    "url": "/trndet/:id",
    "title": "Delete trndet record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "destroy",
    "group": "trndet",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "detlnk",
            "description": "<p>Will send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Deleted",
            "description": "<ul> <li>NO Content.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trndet/trndet.controller.js",
    "groupTitle": "trndet"
  },
  {
    "type": "get",
    "url": "/trndet",
    "title": "ALL trndets information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "index",
    "group": "trndet",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Lists of the trndet.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trndet/trndet.controller.js",
    "groupTitle": "trndet"
  },
  {
    "type": "get",
    "url": "/trndet/:id",
    "title": "Request trndet information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "show",
    "group": "trndet",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "detlnk",
            "description": "<p>Will send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of particular trndet.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trndet/trndet.controller.js",
    "groupTitle": "trndet"
  },
  {
    "type": "put",
    "url": "/trndet/:id",
    "title": "Update trndet record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "update",
    "group": "trndet",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "detlnk",
            "description": "<p>Will send through the url parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Need to Update fields will send through the client server (update in future).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of updated trndet.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trndet/trndet.controller.js",
    "groupTitle": "trndet"
  },
  {
    "type": "post",
    "url": "/trnevt",
    "title": "create trnevt record.",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "create",
    "group": "trnevt",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "BRNID",
            "description": "<p>Branch</p>"
          },
          {
            "group": "Parameter",
            "type": "NUMERIC(11)",
            "optional": false,
            "field": "TRNNBR",
            "description": "<p>Trans Number</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "EVTSNO",
            "description": "<p>Sequnence</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(15)",
            "optional": false,
            "field": "PRDID",
            "description": "<p>Product</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(15)",
            "optional": false,
            "field": "EVTID",
            "description": "<p>Event</p>"
          },
          {
            "group": "Parameter",
            "type": "DATE",
            "optional": false,
            "field": "TRNDAT",
            "description": "<p>Transaction Date</p>"
          },
          {
            "group": "Parameter",
            "type": "DATE",
            "optional": false,
            "field": "VALDAT",
            "description": "<p>Value Date</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(6)",
            "optional": false,
            "field": "VOUNBR",
            "description": "<p>Voucher</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(11)",
            "optional": false,
            "field": "DETLNK",
            "description": "<p>Tran det Link</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(11)",
            "optional": false,
            "field": "DNMLNK",
            "description": "<p>Deno Link</p>"
          },
          {
            "group": "Parameter",
            "type": "NUMERIC(14)",
            "optional": false,
            "field": "TOTCI",
            "description": "<p>Total Cash In</p>"
          },
          {
            "group": "Parameter",
            "type": "NUMERIC(14)",
            "optional": false,
            "field": "TOTCO",
            "description": "<p>Total Cash Out</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(3)",
            "optional": false,
            "field": "TOTCCY",
            "description": "<p>Total Currency</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(11)",
            "optional": false,
            "field": "LMTLNK",
            "description": "<p>Limits  Link</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(11)",
            "optional": false,
            "field": "DUELNK",
            "description": "<p>Dilig Dtls Link</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "CRTUSR",
            "description": "<p>Created User</p>"
          },
          {
            "group": "Parameter",
            "type": "DATE",
            "optional": false,
            "field": "CRTDAT",
            "description": "<p>Created Date</p>"
          },
          {
            "group": "Parameter",
            "type": "TIME",
            "optional": false,
            "field": "CRTTIM",
            "description": "<p>Created Time</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(11)",
            "optional": false,
            "field": "AP1LNK",
            "description": "<p>Appr 1</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(11)",
            "optional": false,
            "field": "AP2LNK",
            "description": "<p>Appr 2</p>"
          },
          {
            "group": "Parameter",
            "type": "NUMERIC(10)",
            "optional": false,
            "field": "DOCNBR",
            "description": "<p>Document Number</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(15)",
            "optional": false,
            "field": "REFNBR",
            "description": "<p>Reference Number</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(11)",
            "optional": false,
            "field": "NARID",
            "description": "<p>Narration</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "REQUSR",
            "description": "<p>Requesting User</p>"
          },
          {
            "group": "Parameter",
            "type": "DATE",
            "optional": false,
            "field": "REQDAT",
            "description": "<p>Request Date</p>"
          },
          {
            "group": "Parameter",
            "type": "TIME",
            "optional": false,
            "field": "REQTIM",
            "description": "<p>Request Time</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(3)",
            "optional": false,
            "field": "EVTSTS",
            "description": "<p>Event Status</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "US1USR",
            "description": "<p>Usrfld User1</p>"
          },
          {
            "group": "Parameter",
            "type": "DATE",
            "optional": false,
            "field": "US1DAT",
            "description": "<p>Usrfld Date 1</p>"
          },
          {
            "group": "Parameter",
            "type": "TIME",
            "optional": false,
            "field": "US1TIM",
            "description": "<p>Usrfld time 1</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(3)",
            "optional": false,
            "field": "US1STS",
            "description": "<p>Usrfld status 1</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(15)",
            "optional": false,
            "field": "US1REF",
            "description": "<p>Usrfld Refer 1</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(11)",
            "optional": false,
            "field": "US1LNK",
            "description": "<p>Usrfld Link 1</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "US1BRN",
            "description": "<p>Usrfld Branch 1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of created trnevt.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trnevt/trnevt.controller.js",
    "groupTitle": "trnevt"
  },
  {
    "type": "delete",
    "url": "/trnevt/:id",
    "title": "Delete trnevt record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "destroy",
    "group": "trnevt",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "Will",
            "description": "<p>send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Deleted",
            "description": "<ul> <li>NO Content.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trnevt/trnevt.controller.js",
    "groupTitle": "trnevt"
  },
  {
    "type": "get",
    "url": "/trnevt",
    "title": "ALL trnevts information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "index",
    "group": "trnevt",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Lists of the trnevt.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trnevt/trnevt.controller.js",
    "groupTitle": "trnevt"
  },
  {
    "type": "get",
    "url": "/trnevt/:id",
    "title": "Request trnevt information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "show",
    "group": "trnevt",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "Will",
            "description": "<p>send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of particular trnevt.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trnevt/trnevt.controller.js",
    "groupTitle": "trnevt"
  },
  {
    "type": "put",
    "url": "/trnevt/:id",
    "title": "Update trnevt record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "update",
    "group": "trnevt",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "Will",
            "description": "<p>send through the url parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Need to Update fields will send through the client server (update in future).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of updated trnevt.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trnevt/trnevt.controller.js",
    "groupTitle": "trnevt"
  },
  {
    "type": "post",
    "url": "/trnhdr",
    "title": "create trnhdr record.",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "create",
    "group": "trnhdr",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "BRNID",
            "description": "<p>Branch</p>"
          },
          {
            "group": "Parameter",
            "type": "NUMERIC(11)",
            "optional": false,
            "field": "TRNNBR",
            "description": "<p>Transaction Number</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(15)",
            "optional": false,
            "field": "PRDID",
            "description": "<p>Product</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(1)",
            "optional": false,
            "field": "CATID",
            "description": "<p>Category</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(1)",
            "optional": false,
            "field": "TFRMOD",
            "description": "<p>Transfer Mode</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "TOBRN",
            "description": "<p>To/With Branch</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "TOUSR",
            "description": "<p>To/With Cashier</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "TOCUS",
            "description": "<p>To/With Customer</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "TOACC",
            "description": "<p>To/With Accounts</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "TOBNK",
            "description": "<p>To/With Bank</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "DLCUSID",
            "description": "<p>Deal Cus.Id</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(3)",
            "optional": false,
            "field": "STATUS",
            "description": "<p>Status</p>"
          },
          {
            "group": "Parameter",
            "type": "NUMERIC(10)",
            "optional": false,
            "field": "USRFLD1",
            "description": "<p>User Field 1</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "USRFLD2",
            "description": "<p>User Field 2</p>"
          },
          {
            "group": "Parameter",
            "type": "DATE",
            "optional": false,
            "field": "USRFLD3",
            "description": "<p>User Field 3</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of created trnhdr.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trnhdr/trnhdr.controller.js",
    "groupTitle": "trnhdr"
  },
  {
    "type": "delete",
    "url": "/trnhdr/:id",
    "title": "Delete trnhdr record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "destroy",
    "group": "trnhdr",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "trnnbr",
            "description": "<p>Will send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Deleted",
            "description": "<ul> <li>NO Content.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trnhdr/trnhdr.controller.js",
    "groupTitle": "trnhdr"
  },
  {
    "type": "get",
    "url": "/trnhdr",
    "title": "ALL trnhdrs information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "index",
    "group": "trnhdr",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Lists of the trnhdr.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trnhdr/trnhdr.controller.js",
    "groupTitle": "trnhdr"
  },
  {
    "type": "get",
    "url": "/trnhdr/:id",
    "title": "Request trnhdr information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "show",
    "group": "trnhdr",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "trnnbr",
            "description": "<p>Will send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of particular trnhdr.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trnhdr/trnhdr.controller.js",
    "groupTitle": "trnhdr"
  },
  {
    "type": "put",
    "url": "/trnhdr/:id",
    "title": "Update trnhdr record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "update",
    "group": "trnhdr",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "trnnbr",
            "description": "<p>Will send through the url parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Need to Update fields will send through the client server (update in future).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of updated trnhdr.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/trnhdr/trnhdr.controller.js",
    "groupTitle": "trnhdr"
  },
  {
    "type": "get",
    "url": "/BRNMAS",
    "title": "To get the BRANCH information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "BranchInfo",
    "group": "usrmas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "BRNID",
            "description": "<p>Branch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "branch",
            "description": "<p>information.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/usrmas/usrmas.controller.js",
    "groupTitle": "usrmas"
  },
  {
    "type": "get",
    "url": "/CTYMAS",
    "title": "To get the list of city's",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "GetCities",
    "group": "usrmas",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "result",
            "description": "<p>of city's .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/usrmas/usrmas.controller.js",
    "groupTitle": "usrmas"
  },
  {
    "type": "get",
    "url": "/CNTMAS",
    "title": "To get the list of countries",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "GetCountry",
    "group": "usrmas",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "result",
            "description": "<p>of country .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/usrmas/usrmas.controller.js",
    "groupTitle": "usrmas"
  },
  {
    "type": "get",
    "url": "/CTYMAS,STTMAS,CNTMAS",
    "title": "To get country and state based on city code",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "GetStateAndCountry",
    "group": "usrmas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "CHAR(3)",
            "optional": false,
            "field": "CTYID",
            "description": "<p>CITY ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "result",
            "description": "<p>of country,state and city.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/usrmas/usrmas.controller.js",
    "groupTitle": "usrmas"
  },
  {
    "type": "get",
    "url": "/STTMAS",
    "title": "To get the list of states",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "GetStates",
    "group": "usrmas",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "result",
            "description": "<p>of states .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/usrmas/usrmas.controller.js",
    "groupTitle": "usrmas"
  },
  {
    "type": "get",
    "url": "/NXTBIL",
    "title": "To get the bill number",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "GetbillNO",
    "group": "usrmas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "USRID",
            "description": "<p>User id</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "BRNID",
            "description": "<p>Branch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "bill",
            "description": "<p>number.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-Not",
            "description": "<p>Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/usrmas/usrmas.controller.js",
    "groupTitle": "usrmas"
  },
  {
    "type": "put",
    "url": "/NXTBIL",
    "title": "To upadate the nextbill number",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "UpdateNextBill",
    "group": "usrmas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "CHAR(10)",
            "optional": false,
            "field": "USRID",
            "description": "<p>User id</p>"
          },
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "BRNID",
            "description": "<p>Branch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-Not",
            "description": "<p>Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/usrmas/usrmas.controller.js",
    "groupTitle": "usrmas"
  },
  {
    "type": "post",
    "url": "/usrmas",
    "title": "create usrmas record.",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "create",
    "group": "usrmas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>ALL fields will send through the client server (update in future).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of created usrmas.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/usrmas/usrmas.controller.js",
    "groupTitle": "usrmas"
  },
  {
    "type": "delete",
    "url": "/usrmas/:id",
    "title": "Delete usrmas record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "destroy",
    "group": "usrmas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "USRID",
            "description": "<p>Will send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Deleted",
            "description": "<ul> <li>NO Content.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/usrmas/usrmas.controller.js",
    "groupTitle": "usrmas"
  },
  {
    "type": "get",
    "url": "/PRDSBF",
    "title": "ALL Currency buy or sell products information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "getUserProduct",
    "group": "usrmas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "BRNID",
            "description": "<p>Branch</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(15)",
            "optional": false,
            "field": "PRDID",
            "description": "<p>Product</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Lists of the prdsbf.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-Not",
            "description": "<p>Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/usrmas/usrmas.controller.js",
    "groupTitle": "usrmas"
  },
  {
    "type": "get",
    "url": "/usrmas",
    "title": "ALL usrmass information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "index",
    "group": "usrmas",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Lists of the usrmas.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/usrmas/usrmas.controller.js",
    "groupTitle": "usrmas"
  },
  {
    "type": "get",
    "url": "/usrmas/:id",
    "title": "Request usrmas information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "show",
    "group": "usrmas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "USRID",
            "description": "<p>Will send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of particular usrmas.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/usrmas/usrmas.controller.js",
    "groupTitle": "usrmas"
  },
  {
    "type": "put",
    "url": "/usrmas/:id",
    "title": "Update usrmas record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "update",
    "group": "usrmas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "USRID",
            "description": "<p>Will send through the url parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Need to Update fields will send through the client server (update in future).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of updated usrmas.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/usrmas/usrmas.controller.js",
    "groupTitle": "usrmas"
  },
  {
    "type": "post",
    "url": "/vouchers",
    "title": "create vouchers record.",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "create",
    "group": "vouchers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>ALL fields will send through the client server (update in future).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of created vouchers.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/vouchers/vouchers.controller.js",
    "groupTitle": "vouchers"
  },
  {
    "type": "post",
    "url": "/vouchers",
    "title": "To get vouchers status record.",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "create",
    "group": "vouchers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "BRNID",
            "description": "<p>Branch</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(6)",
            "optional": false,
            "field": "VOUNBR",
            "description": "<p>Voucher</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of created vouchers.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "201-Authorized",
            "description": "<p>limit is not in Active.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "201-Voucher",
            "description": "<p>number not existed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "201-Invalid",
            "description": "<p>voucher number.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "201-voucher",
            "description": "<p>already approved.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/vouchers/vouchers.controller.js",
    "groupTitle": "vouchers"
  },
  {
    "type": "post",
    "url": "/vouchers",
    "title": "Toupdate vouchers status record in MISXNH and TRNEVT.",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "create",
    "group": "vouchers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "DECIMAL(3)",
            "optional": false,
            "field": "BRNID",
            "description": "<p>Branch</p>"
          },
          {
            "group": "Parameter",
            "type": "CHAR(6)",
            "optional": false,
            "field": "VOUNBR",
            "description": "<p>Voucher</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of created vouchers.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/vouchers/vouchers.controller.js",
    "groupTitle": "vouchers"
  },
  {
    "type": "delete",
    "url": "/vouchers/:id",
    "title": "Delete vouchers record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "destroy",
    "group": "vouchers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "Will",
            "description": "<p>send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Deleted",
            "description": "<ul> <li>NO Content.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/vouchers/vouchers.controller.js",
    "groupTitle": "vouchers"
  },
  {
    "type": "get",
    "url": "/vouchers",
    "title": "ALL voucherss information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "index",
    "group": "vouchers",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Lists of the vouchers.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/vouchers/vouchers.controller.js",
    "groupTitle": "vouchers"
  },
  {
    "type": "get",
    "url": "/vouchers/:id",
    "title": "Request vouchers information",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "show",
    "group": "vouchers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "Will",
            "description": "<p>send through the url parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of particular vouchers.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/vouchers/vouchers.controller.js",
    "groupTitle": "vouchers"
  },
  {
    "type": "put",
    "url": "/vouchers/:id",
    "title": "Update vouchers record",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Bearer Authorization value will sent through headers.</p>"
          }
        ]
      }
    },
    "name": "update",
    "group": "vouchers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Sring/Number",
            "optional": false,
            "field": "Will",
            "description": "<p>send through the url parameter.</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Need to Update fields will send through the client server (update in future).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "ALL_Fields",
            "description": "<p>Result of updated vouchers.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404-NoDataFound",
            "description": "<p>Not Found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500-InternalServerError",
            "description": "<p>SERVER error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api/vouchers/vouchers.controller.js",
    "groupTitle": "vouchers"
  }
] });
