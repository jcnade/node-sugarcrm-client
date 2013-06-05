node-sugarcrm-client
====================

SugarCRM REST API Client in node.js 

https://travis-ci.org/jcnade/node-sugarcrm-client.png


* Tested on SugarCRM Community Edition 6.5.* on RESP API v4.1


Provide URL, login and password:

     var sugar = require('node-sugarcrm-client');
     sugar.init(
        {
            apiURL:  "http://*********/sugarcrm/service/v4_1/rest.php"
           ,login:   "*******",
           ,passwd:  "*******"
        }
      );


Config Check:

     console.log(sugar.configInfo());


Create a new Account :

		params = {
					 session:  sessionID
					,module_name : "Accounts"
					,name_value_list : [
									  	{ "name":  "name",  "value": "Account from Node-SugarCRM-Client" }
				 					  	]
				 };
		sugar.call("set_entry", params, function(res,err){
			console.log(res,err)
		});

