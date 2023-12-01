/* creating the function and adding the event for 
confirmation if creator want to delete any entry*/
//hh
// This is an immediately-invoked function expression (IIFE) to encapsulate the code and avoid polluting the global scope.
(function(){
    
    // This is the main function named Start.
    function Start() 
    {
        // Log a message to indicate that the app has started.
        console.log("App Started");

        // Select all elements with the class 'btn-danger' and store them in deleteButtons.
        let deleteButtons = document.querySelectorAll('.btn-danger');

        // Iterate through each delete button and attach a click event listener.
        for(button of deleteButtons)
        {
            button.addEventListener('click',(event)=>{
                // Display a confirmation dialog, and if the user clicks cancel, prevent the default behavior
                // (e.g., prevent the button from triggering its usual action) and redirect to '/course-list'.
                if(!confirm("ARE YOU SURE?"))
                {
                    event.preventDefault();
                    window.location.assign('/course-list');
                }
            })
        }
    }

    // Add an event listener to execute the Start function when the window has finished loading.
    window.addEventListener("load", Start);

})(); // This immediately invokes the function after it's defined.

    

    