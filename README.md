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


### Login and get a session ID


    sugar.login(function(sessionID){

        if (sessionID != 'undefined') {

            // If you are here, you got a session ID
            // and you can add all your query here

            console.log('Your session ID is', sessionID);


        } else {
            console.log("can't login, check your credentials");
        }
    });



### Create a new Account


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


### Create a new Contact

		params = {
					 session:  sessionID
					,module_name : "Contacts"
					,name_value_list : [
						{ name:'first_name'  , value: 'Daneel'   },
						{ name:'last_name'   , value: 'Olivaw' },

						{ name:'title'  , 		value: 'R.'   },
						{ name:'phone_work'   , value: '555-2368' },
					]

				 };
		sugar.call("set_entry", params, function(res,err){
			console.log(res, err);
		})



###  Create a relationship link from an Account to a contact

You need to know before the account ID and the contacts ID.
Yes, the name 'module_id' is very confusing.

		params = {
					 session:  sessionID
					,module_name : 'Accounts'
					,module_id : "d41ad995-7f68-5238-a054-51af62906e81" // the account ID
					,link_field_name : 'contacts'
					,related_ids : ["b1378306-2d84-6e01-6c4a-51af41058b94"]  // some contacts ID

				 };
		sugar.call("set_relationship", params, function(res,err){
			console.log(res, err);
		})



### Query the Acounts table

This query will give you a dump

        params = {
                     session:  sessionID
                    ,module_name : "Accounts"
                    ,query : ""
                    ,order_by : ''
                    ,offset : '0'
                    ,select_fields : [ 'id' ,'name']
                    ,link_name_to_fields_array : []
                    ,max_results : -1
                    ,deleted : '0'
                    ,Favorites : false

                 };
        sugar.call("get_entry_list", params, function(res,err){

            if (err) {
                console.log(err)
            }
            else {
                console.log(res);
            }

        });



### Create and Update a Documents


        params = {
                    session:  sessionID
                   ,module_name : "Documents"
                   ,name_value_list : [
                                       { "name":  "document_name",	"value": "Document from Node-sugarCRM-Client REST API" },
                                       { "name":  "revision",		"value": "1" },
                                      ]
                 };

        sugar.call("set_entry", params, function(document){

                console.log('Document is',document.id);

                // Note
                params = {
                           session:  sessionID
                           ,note : {
                                      id: document.id
                                     ,file : new Buffer("This text come from the REST API").toString('base64')
                                     ,filename : 'note.txt'
                                     ,revision : '1'
                            }
                         };
                sugar.call("set_document_revision", params, function(res){
                    console.log(res);
                });
        });


### Create a relationship link from an Documents to an account

		params = {
					 session:  sessionID
					,module_name : 'Documents'
					,module_id : "286832e1-e3a7-1384-a884-51af487d6b16" // document ID
					,link_field_name : 'accounts'
					,related_ids : ["d41ad995-7f68-5238-a054-51af62906e81"] // Some account IDs
				 };

		sugar.call("set_relationship", params, function(res,err){
			console.log(res, err);
		})



















