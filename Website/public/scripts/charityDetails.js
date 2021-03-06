var charity = '';
var event = '';
var address = '';
var order = [];

function getHome(charities,events){
	charity = JSON.parse(charities);
	event = JSON.parse(events);
	cardRow(0,"row1");
	cardRow(3,"row2");
	cardRow(6,"row3");
	homeEvents();
	homeTypes();
	randCards(9);
}

function viewCharity(num,charities,events,addresses){
	charity = JSON.parse(charities);
	event = JSON.parse(events);
	address = JSON.parse(addresses);
	loadCharity(num);
	cardRow(0,"similar");
	randCards(3,num);
}

function getSearch(charities,term,page){
	charity = JSON.parse(charities);
	if(page == null){page = 0};
	if(charity[0]){
		cardRow(0,"row1");
		cardRow(3,"row2");
		orderCards(6);
	}
	else{document.getElementById("row1").innerHTML = '<p>There are no charities matching your search.</p>';}
	if(page>0){
		document.getElementById("prev_page").href = '/search?term=' + term + '&page=' + (page-1);
	}
	else{
		document.getElementById("prev_page").style.display = "none";
	}
	if(charity[6]){
		document.getElementById("next_page").href = '/search?term=' + term + '&page=' + (page+1);
	}
	else{
		document.getElementById("next_page").style.display = "none";
	}
}

function getCalendar(charities,events){
	charity = JSON.parse(charities);
	event = JSON.parse(events);
	document.getElementById("charity_brand").innerHTML = "Events Calendar";
	for ( let i = 0 ; i < Math.ceil(event.length/4) ; i++ ) {
		document.getElementById("events_calendar").innerHTML = document.getElementById("events_calendar").innerHTML + 
			"<div class='card-deck text-center' id='row" + i + "'></div><br>";
	}
	for ( let i = 0 ; i < event.length ; i++ ) {
		var eventDate = new Date(event[i].event_date).toDateString();
		if(event[i].event_time) {var eventTime = event[i].event_time;}
		else{var eventTime = '';}
		if(event[i].description) {var eventDesc = event[i].description;}
		else{var eventDesc = '';}
		document.getElementById("row" + Math.floor(i/4)).innerHTML = document.getElementById("row" + Math.floor(i/4)).innerHTML + 
			"<div class='card rounded border-dark text-center'>" + 
				"<a href='./view-charity?id=" + event[i].org_id + "' style='text-decoration: none;'>" + 
					"<p class='card-header bg-info text-light font-weight-bold'>" + 
						event[i].title + 
					"</p>" + 
				"</a>" + 
				"<a href='./view-charity?id=" + event[i].org_id + "' class='text-dark font-italic' style='text-decoration:none;'>" + charity[event[i].org_id].name + "</a>" + 
				"<br>" + 
				"<span class='card-text font-weight-bold'>" + 
					eventDate.substring(4, 10) + "," + eventDate.substring(10, 15) + 
				"</span>" + 
				"<br>" + 
				"<span class='card-text'>" + 
					 eventDesc + 
				"</span>" + 
				// "<a type='button' class='btn btn-dark btn-sm'>Delete Event</a>" + 
			"</div>";
	}
	for ( let i = 0 ; i < ( 4 - event.length % 4 ) ; i++ ) {
		document.getElementById("row" + Math.floor(event.length/4)).innerHTML = document.getElementById("row" + Math.floor(event.length/4)).innerHTML + "<div class='card border-0'></div>";
	}
}

function orderCards(num){
	for ( i = 0 ; i < num ; i++ ) {
		cardCharity(i,i);
	}
}

function randCards(num, id = -1){
	order = [];
	for ( let i = 0; i < charity.length ; i++ ) {
		if ( i != id ){
			order.push(i);
		}
	}
	for ( let i = order.length - 1; i > 0; i-- ) {
		let j = Math.floor(Math.random() * (i + 1));
		[order[i], order[j]] = [order[j], order[i]];
	}
	for ( i = 0 ; i < num ; i++ ) {
		cardCharity(i,order[i]);
	}
}

function loadCharity(num){
	// Title & Logo
	document.getElementById("charity_title").innerHTML = charity[num].name + " - CharityHub Profile";
	document.getElementById("charity_brand").innerHTML = charity[num].name;
	document.getElementById("charity_logo").src = './img/charity/' + charity[num].org_id + 'L.png';
	document.getElementById("charity_logo").alt = charity[num].name;
	document.getElementById("charity_tag").innerHTML = charity[num].tag;

	// Charity Type List
	document.getElementById("types").innerHTML = "<a type='button' id='type1' class='btn btn-dark btn-sm my-1' href='/search?term=" + charity[num].type1 + "'>" + charity[num].type1 + "</a>"
	if( charity[num].type2 !== "" )
		document.getElementById("types").innerHTML = document.getElementById("types").innerHTML + " <a type='button' id='type2' class='btn btn-dark btn-sm my-1' href='/search?term=" + charity[num].type2 + "'>" + charity[num].type2 + "</a>"
	if( charity[num].type3 !== "" )
		document.getElementById("types").innerHTML = document.getElementById("types").innerHTML + " <a type='button' id='type2' class='btn btn-dark btn-sm my-1' href='/search?term=" + charity[num].type3 + "'>" + charity[num].type3 + "</a>"
	document.getElementById("types").innerHTML = document.getElementById("types").innerHTML + "<br><br>";

	// Address
	document.getElementById("charity_contact").innerHTML = address.address + '<br>';
	if(address.address2){
		document.getElementById("charity_contact").innerHTML = document.getElementById("charity_contact").innerHTML + address.address2 + '<br>';
	}
	document.getElementById("charity_contact").innerHTML = document.getElementById("charity_contact").innerHTML + address.district + ' ' + address.postal_code + '<br>' + address.phone;

	// Website & Social Media Links
	document.getElementById("links").innerHTML = "<a type='button' id='charity_url' class='btn btn-dark btn-sm' href='" + charity[num].url + "'>Official Website</a>";
	if( charity[num].url_fb !== "" )
		document.getElementById("links").innerHTML = document.getElementById("links").innerHTML + " <a class='fa fa-facebook-official fa-2x' href='" + charity[num].url_fb + "' style='vertical-align:bottom; color: #343a40; text-decoration: none;'></a>"
	if( charity[num].url_tw !== "" )
		document.getElementById("links").innerHTML = document.getElementById("links").innerHTML + " <a class='fa fa-twitter fa-2x' href='" + charity[num].url_tw + "' style='vertical-align:bottom; color: #343a40; text-decoration: none;'></a>"
	if( charity[num].url_in !== "" )
		document.getElementById("links").innerHTML = document.getElementById("links").innerHTML + " <a class='fa fa-instagram fa-2x' href='" + charity[num].url_in + "' style='vertical-align:bottom; color: #343a40; text-decoration: none;'></a>"
	document.getElementById("links").innerHTML = document.getElementById("links").innerHTML + "<br><br>";

	// Mission
	if( charity[num].mission !== "" )
		document.getElementById("charity_desc").innerHTML = charity[num].mission;
	else
		document.getElementById("charity_desc").innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu lobortis elementum nibh tellus molestie nunc. Fringilla urna porttitor rhoncus dolor purus non enim. Ac odio tempor orci dapibus ultrices in. Duis ultricies lacus sed turpis tincidunt id aliquet risus. Feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Donec ac odio tempor orci. Nascetur ridiculus mus mauris vitae. Ut lectus arcu bibendum at varius. Non arcu risus quis varius quam quisque id diam."; // Dummy description if blank

	// Events
	for ( let i=0 ; i < 3 ; i++ ) {
		if(event[i]){
			var eventDate = new Date(event[i].event_date).toDateString();
			if(event[i].description) {var eventDesc = event[i].description;}
			else{var eventDesc = '';}
			document.getElementById("events").innerHTML = document.getElementById("events").innerHTML + 
				"<div class='card my-2'><button type='button' class='btn btn-info' onclick='eventDesc(" + i + ")'>" + event[i].title + 
				"</button><br><span>" + eventDate.substring(4, 10) + "," + eventDate.substring(10, 15) + "</span>" + 
				'<span class="font-italic" id="event_desc' + i + '" style="display: none;">' + eventDesc + '</span></div>';
		}
	}
	if(event[0]==null){document.getElementById("events").innerHTML = '<p>There are no upcoming events for this organization.</p>'};
	document.getElementById("add_event").href = '/add-event?id=' + charity[num].org_id;

	// Photo
	document.getElementById("photo").src = './img/charity/' + charity[num].org_id + '.jpg';
}

function eventDesc(num){
	document.getElementById("event_desc" + num).style.display = document.getElementById("event_desc" + num).style.display === 'none' ? '' : 'none';
}

function cardRow(icard,location){
	var box = document.getElementById(location);
	for ( let i = 0 ; i<3 ; i++ ) {
		if ( charity[icard+i] ){
			box.innerHTML = box.innerHTML
				+ "<div class='card border-dark bg-light' style='width: 18rem;'><a class='text-dark' style='text-decoration: none;' id='item_url"
				+ (icard+i) + "'><h5 class='card-header' id='item_title"
				+ (icard+i) + "'></h5><img class='card-img-top' id='item_photo"
				+ (icard+i) + "' src='data:,'></a><div class='container'><span class='card-text' id='item_desc"
				+ (icard+i) + "'></span><div class='container border border-light' id='item_types"
				+ (icard+i) + "'></div></div></div>";
		}
		else {
			box.innerHTML = box.innerHTML + "<div class='card bg-transparent border-0'></div>";
		}
	}
}

function cardCharity(card,num){
	if ( charity[num] ){
		document.getElementById("item_photo" + card).src = './img/charity/' + charity[num].org_id + '.jpg';
		document.getElementById("item_title" + card).innerHTML = charity[num].name;
		document.getElementById("item_url" + card).href = "./view-charity?id=" + charity[num].org_id;
		document.getElementById("item_desc" + card).innerHTML = charity[num].tag;
		document.getElementById("item_types" + card).innerHTML = "<a type='button' class='btn btn-dark btn-sm my-1' href='/search?term=" + charity[num].type1 + "'>" + charity[num].type1 + "</a>"
		if( charity[num].type2 !== "" )
			document.getElementById("item_types" + card).innerHTML = document.getElementById("item_types" + card).innerHTML + " <a type='button' class='btn btn-dark btn-sm my-1' href='/search?term=" + charity[num].type2 + "'>" + charity[num].type2 + "</a>"
		if( charity[num].type3 !== "" )
			document.getElementById("item_types" + card).innerHTML = document.getElementById("item_types" + card).innerHTML + " <a type='button' class='btn btn-dark btn-sm my-1' href='/search?term=" + charity[num].type3 + "'>" + charity[num].type3 + "</a>"
	}
}

function homeEvents(){
	for ( let i = 0 ; i < Math.min(4,event.length) ; i++ ) {
		var eventDate = new Date(event[i].event_date).toDateString();
		if(event[i].event_time) {var eventTime = event[i].event_time;}
		else{var eventTime = '';}
		if(event[i].description) {var eventDesc = event[i].description;}
		else{var eventDesc = '';}
		document.getElementById("events").innerHTML = document.getElementById("events").innerHTML + 
			"<div class='card rounded border-dark text-center'>" + 
				"<a href='./view-charity?id=" + event[i].org_id + "' style='text-decoration: none;'>" + 
					"<p class='card-header bg-danger text-light font-weight-bold'>" + 
						event[i].title + 
					"</p>" + 
				"</a>" + 
					"<a href='./view-charity?id=" + event[i].org_id + "' class='text-dark font-italic' style='text-decoration:none;'>" + 
						charity[event[i].org_id].name + "</a>" + 
					"<br>" + 
					"<span class='card-text font-weight-bold'>" + 
						eventDate.substring(4, 10) + "," + eventDate.substring(10, 15) + 
					"</span>" + 
					"<br>" + 
					"<span class='card-text'>" + 
						 eventDesc + 
					"</span>" + 
			"</div>";
	}
	for ( let i = 0 ; i < ( 4 - event.length ) ; i++ ) {
		document.getElementById("events").innerHTML = document.getElementById("events").innerHTML + "<div class='card bg-transparent border-0'></div>";
	}
}

function homeTypes(){
	var types = ['Volunteering', 'Health', 'Conservation', 'Disaster Relief', 'Food Bank', 'International', 'Animals', 'Environment', 'Local']
	for ( let i = 0 ; i < types.length ; i++ ) {
		document.getElementById("types").innerHTML = document.getElementById("types").innerHTML + 
		"<a type='button' class='btn btn-lg btn-dark my-1 mr-1' href='/search?term=" + types[i] + "'>" + types[i] + "</a>";
	}
}

function searchBox(){
	window.location = '/search?term=' + document.getElementById("search_input").value;
}
