
var login = Ext.create('Ext.Button', {
	html : '<b>Login</b>',
	layout : {
		type : 'absolute'
	},
	x:140,
	y:200,
	handler:function(){
		
		//Calling Loader 
		Ext.get('myModal').show();
		Ext.select('.loader1').show();
		Ext.Ajax.request({
			url : 'login.action',
			method : 'POST',
			reader : {
				type : 'json', // assigning typeof response
			},
			params : {
				emailId : Ext.getCmp('emailId').getValue(),
				password:Ext.getCmp('pass').getValue()
			},
			success : function(result, request) {
				//Hiding Loader 
				Ext.get('myModal').hide();
				Ext.select('.loader1').hide();
				var data = Ext.decode(result.responseText, true);

				if (data.status == "success") {// if response length is not
												// equal to zero
					 window.location.assign(data.url);
				} else {
					Ext.Msg.alert("Failed", data.message);
				}

			},
			failure : function(result, request) {
				//Hiding Loader 
				Ext.get('myModal').hide();
				Ext.select('.loader1').hide();
				Ext.Msg.alert("Failed", data.message);
			}
		});

	}
	
	
});

var reset = Ext.create('Ext.Button', {
	html : '<b>Reset</b>',
	layout : {
		type : 'absolute'
	},
	x:210,
	y:200,
	handler:function(){
		Ext.getCmp('user').setValue('');
		Ext.getCmp('pass').setValue('');
	}
});

var forgetPassword = Ext.create('Ext.Button', {
	html : '<b>Forget Password</b>',
	layout : {
		type : 'absolute'
	},
	x:180,
	y:240,
	handler:function(){
		 window.location.assign("forgetPassword.jsp");

	}
});

var newRegister = Ext.create('Ext.Button', {
	html : '<b>Register</b>',
	layout : {
		type : 'absolute'
	},
	x:280,
	y:200,
	handler:function(){
		 window.location.assign("register.jsp");

	}
});


var loginTab=Ext.create('Ext.panel.Panel', {
    html : '<h1 style="text-align:center;">Login</h1>',
	bodyStyle : {
		"background-color" : "DarkTurquoise"
	},
	width :'30%',
	height:300,
	x:500,
	y:200,
	layout: {
        type: 'absolute'
        // layout-specific configs go here
        //itemCls: 'x-abs-layout-item',
    },
	// overflowY: 'scroll',
    items:[{
        xtype: 'textfield',
        name: 'Email Id',
        fieldLabel: 'Email Id',
        afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        id:"emailId",
        layout: {
            type: 'absolute'
            // layout-specific configs go here
            //itemCls: 'x-abs-layout-item',
        },
        x:30,
        y:70,
        width:'75%',
        allowBlank: false  // requires a non-empty value
    },{
        xtype: 'textfield',
        name: 'name',
        id:'pass',
        fieldLabel: 'Password',
        afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        inputType: 'password',
        layout: {
            type: 'absolute'
            // layout-specific configs go here
            //itemCls: 'x-abs-layout-item',
        },
        x:30,
        y:130,
        width:'75%',
        allowBlank: false  // requires a non-empty value
    },login,reset,forgetPassword,newRegister],
   border:1, 

   style:{  borderColor: 'DarkCyan', borderStyle: 'solid',borderWidth: '7px', },


});











// Creating a onready function which execute only when all the components are
// ready
Ext.onReady(function() {
	// This is the paren panel
	Ext.create('Ext.panel.Panel', {
		width : '100%',
		height : 700,
		bodyStyle : {
			"background-color" : "DarkTurquoise"
		},
		
		/*
		 * style: { //This style is used to identify the panel which helps
		 * during UI creation borderColor: 'Tomato', borderStyle: 'solid',
		 * borderWidth: '3px' },
		 */
		renderTo : Ext.getBody(),
		items : [ loginTab]
	}); // End of parent panel
});// End of onReady function
