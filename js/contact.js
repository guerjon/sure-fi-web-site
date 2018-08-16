'use_strict';

const url = "http://admin.sure-fi.com/sales_api/post_contact_user_form";
const SUCCESS_RESPONSE = 200


async function sendFormInptus(form){
	console.log("sendFormInptus()",form.serialize())
	
	var form = new FormData(document.getElementById('contact-form'));
	
	fetch(url,{
		method: "POST",
		body: form
	})
	.then(response => {
		return response.json()
	})
	.then(json => {
		console.log(json);
		const status = json.status;
		const alert_container = $("#error-alert");
		const succes_alert = $("#success-alert");
		const get_updates_section = $("#get-updates-section");

		if(status == SUCCESS_RESPONSE){
			
			get_updates_section.hide();
			alert_container.hide();
			$( "#contact-form" ).hide();

			succes_alert.show();
			
		}else{
			let data = json.data;
			if(Array.isArray(data) && (data.length > 0)){
				
				const list = $("#server-errors-list");
				list.empty();
				data.map(x => {
					list.append("<li>" + x + "</li>");
				})

				alert_container.show();
				
			}
			
		}
	})
	.catch(error => {
		console.log(error)
	})
}


$(function(){
	$( "#contact-form" ).on( "submit", function( event ) {
  		event.preventDefault();
  		sendFormInptus($(this));
	});
	

});