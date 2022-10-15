
var submit = Ext.create('Ext.Button', {
	html : '<b>Submit</b>',
	layout : {
		type : 'absolute'
	},
	x:150,
	y:250,
	handler:function(){
		
		//Calling Loader 
		Ext.get('myModal').show();
		Ext.select('.loader1').show();
		Ext.Ajax.request({
			url : 'forgetPassword.action',
			method : 'POST',
			reader : {
				type : 'json', // assigning typeof response
			},
			params : {
				firstName:Ext.getCmp('firstName').getValue(),
				lastName:Ext.getCmp('lastName').getValue(),
				emailId:Ext.getCmp('emailId').getValue()		
			},
			success : function(result, request) {
				//Hiding Loader 
				Ext.get('myModal').hide();
				Ext.select('.loader1').hide();
				var data = Ext.decode(result.responseText, true);

				if (data.status == "success") {// if response length is not
					Ext.Msg.alert("Success", data.message);
					Ext.getCmp('firstName').setValue('');
					Ext.getCmp('lastName').setValue('');
					Ext.getCmp('emailId').setValue('');
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
	x:240,
	y:250,
	handler:function(){
		Ext.getCmp('firstName').setValue('');
		Ext.getCmp('lastName').setValue('');
		Ext.getCmp('emailId').setValue('');
	}
});



var resetTab=Ext.create('Ext.panel.Panel', {
    html : '<h1 style="text-align:center;">  Reset Password</h1>',
	bodyStyle : {
		"background-color" : "DarkTurquoise"
	},
	width :'30%',
	height:330,
	x:500,
	y:150,
	layout: {
        type: 'absolute'
        // layout-specific configs go here
        //itemCls: 'x-abs-layout-item',
    },
	// overflowY: 'scroll',
    items:[{
        xtype: 'textfield',
        name: 'name',
        fieldLabel: 'First Name',
        afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        id:"firstName",
        layout: {
            type: 'absolute'
            // layout-specific configs go here
            //itemCls: 'x-abs-layout-item',
        },
        x:30,
        y:70,
        width:'70%',
        allowBlank: false  // requires a non-empty value
    },{
        xtype: 'textfield',
        name: 'name',
        fieldLabel: 'Last Name',
        afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        id:"lastName",
        layout: {
            type: 'absolute'
            // layout-specific configs go here
            //itemCls: 'x-abs-layout-item',
        },
        x:30,
        y:130,
        width:'70%',
        allowBlank: false  // requires a non-empty value
    },{
        xtype: 'textfield',
        name: 'name',
        fieldLabel: 'Email Id',
        afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        id:"emailId",
        layout: {
            type: 'absolute'
            // layout-specific configs go here
            //itemCls: 'x-abs-layout-item',
        },
        x:30,
        y:190,
        width:'70%',
        allowBlank: false  // requires a non-empty value
    },submit,reset],
   border:1, 

   style:{  borderColor: 'Aquamarine', borderStyle: 'solid',borderWidth: '7px', },


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
		items : [ resetTab]
	}); // End of parent panel
});// End of onReady function
