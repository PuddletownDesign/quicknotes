/* 
	QuickNotes controller
	
	Bugs
	1. Problem deleting notes on that were 
	created after the page was last refreshed.
	event.preventDefault() doesnt even seem to register
	
 */

//when the app is loaded...
$(function(){ 
	/* 
	Events
	 */
	
	//page is loaded... initialize app
	quicknotes.init();


	
	
	/* 
	make a new post
	 */
	//when text is entered into the form
	$('form').submit(function(event) {
		event.preventDefault();
		
		//calls the create post method
		quicknotes.createPost();
	});
	
	
	/* 
	delete a post
	 */
	//when a delete button is clicked
	//live is used to make sure that the element is tied to events
	//that are created after it is declared
	$('a.delete').live('click', function(event) {
		event.preventDefault();
		
		//gets the notes id, stored in each <li id="#"> 
		var id = $(this)
			.parent('div')
			.parent("li")
			.attr('id')
		;
		//hide the list item
		$('#'+id).slideUp('slow');
		
		//calls the delete method		
		quicknotes.deletePost(id);
		
		//focus the form
		$('#note').select();
	});
	
	
	//clicking delete all notes, deletes all notes in the database
	$('.delete-all').click(function(event) {
		event.preventDefault();
		
		//hides the element
		$('#notes li').slideUp('slow');
		
		quicknotes.deleteAllPosts();
		
		//focus the form again
		$('#note').focus().select();
	});
	
	
	
});