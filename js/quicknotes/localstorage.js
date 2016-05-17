/* 
	Quicknotes LocalStorage Model
 */

var quicknotes = {
	
	//total note in the database
	activeNotes: localStorage.length,
	
	//row in table keeping track of auto incremented key
	//all new posts keys are auto incremented
	noteCount: parseInt(localStorage.getItem("notecount")),
	
	//default message for the form
	formMessage: '',
	
	/* 
	///////// Interface //////////////
	 */
	
	//initialize application
	init: function (){
		//test if this is first run...
		if(isNaN(this.noteCount)) {
			localStorage.setItem('notecount',0);
			this.noteCount = 0;
		}
		
		//bonus - check to see if get request is present
		//if so insert into db and close window
		if(window.location.search != '') {
			this._insertGetRequest();
		}
		
		//focus the form
		$('#note')
			.attr('value', this.formMessage)
			.focus()
			.select()
		;
		//get all of the posts
		this._getPosts();
	},
	
	
	/* 
	create a post
	 */
	createPost: function (){
		//update note count
		this.noteCount = parseInt(this.noteCount+1)
		
		//set the id to the new note count
		var id = parseInt(this.noteCount);
		var text = $('#note').attr('value');
		
		//make sure message is not blank or default
		if(text !='' && text != this.formMessage) {
			$('<li id="'+ id+'">\
				<div>\
					<a href="#" class="delete">delete</a>\
					<small><em>(#'+id+')</em></small>\
				</div>'+text+'\
			   </li>')
				.prependTo('#notes')
				.hide().slideDown('slow')
			;
			
			//update database
			localStorage.setItem(id, text);
			localStorage.setItem('notecount', id);
			
			//reset form to empty and focus
			$('#note').attr('value', '').focus();
		}
	},
	
	
	
	/* 
	delete a post 
	*/
	deletePost: function (id){
		localStorage.removeItem(id);
	},
	
	
	/* Delete all posts 
	*/
	deleteAllPosts: function (){
		
		//clears the database
		localStorage.clear();
		
		//reset the note count
		this.noteCount = 0;
	},
	
	
	 /* 
		/////// internal methods //////////
	 */
	
	
	/* 
	Gets the list of Posts from the Database
	** Called from the init() method
	 */
	_getPosts: function (){
		var notes = $('#notes');
		
		//hide the notes form
		
		notes.hide();
		//get all posts out of database
		for (var i=0; i<this.activeNotes; i++) {
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			//don't select the notecount row...
			if(key != 'notecount') {
				$('<li id="'+key+'">\
				<div>\
					<a href="#" class="delete">delete</a>\
					<small><em>(#'+key+')</em></small>\
				</div>\
					'+value+' \
				</li>').appendTo('#notes');
			}
		}
		var notes = this._sortById(notes);
		//show the posts...
		notes.slideDown('slow');
	},
	
	/* 
		Sorts a list by id
		** Called from get post
		
		For whatever reason the rows in the database change order when editing
		or deleting other rows. Only the initial page load of lists needs to be
		sorted as the newest ones get appended onto of the form anyway...
	 */
	_sortById: function (list){
		var listitems = list.children('li').get();
		listitems.sort(function(a, b) {
		   var compA = parseInt($(a).attr('id'));
		   var compB = parseInt($(b).attr('id'));
		   return (compA < compB) ? 1 : (compA > compB) ? -1 : 0;
		});
		
		$.each(listitems, function(idx, itm) { list.append(itm); });
		
		return list;
	},
	
	/* 
	Insert Via Get request
	*** using either ?text to insert or ?=text to insert in url
	 */
	_insertGetRequest: function (){
		var text = window.location.search;
		text = text.replace('?', '');
		var decoded = decodeURIComponent((text + '').replace(/\+/g, '%20'))		
		var id = parseInt(this.noteCount)+1;
		//update database
		localStorage.setItem(id, decoded);
		localStorage.setItem('notecount', id);
		
		window.location = './';
		return;
	}
};