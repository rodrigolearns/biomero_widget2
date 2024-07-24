var jQueryNoConflict = jQuery.noConflict(true);

jQueryNoConflict(document).ready(function($) {
    $("#widget_window").resizable({
        handles: "all"
    }).draggable({
        handle: ".window-header"
    });

    // Minimize button functionality
    $(".minimize-btn").on('click', function() {
        $("#widget_window").addClass("minimized").draggable("option", "handle", ".restore-btn");
        $("#widget_window").resizable("option", "disabled", true);
        if ($(".restore-btn").length === 0) {
            $("#widget_window").append('<div class="restore-btn">+</div>');
        }
    });

    // Restore button functionality
    $("#widget_window").on('click', '.restore-btn', function() {
        $("#widget_window").removeClass("minimized").draggable("option", "handle", ".window-header");
        $("#widget_window").resizable("option", "disabled", false);
        $(".restore-btn").remove();
    });

    // Maximize button functionality
    $(".maximize-btn").on('click', function() {
        $("#widget_window").toggleClass("maximized");
    });

    // Close button functionality
    $(".close-btn").on('click', function() {
        $("#widget_window").hide();
    });

    // Function to fetch and render the script menu
    function fetchScriptMenu() {
        $.getJSON("static/data/script_data.json", function(response) {
            // Handle the response from the server
            console.log("Script menu fetched successfully:", response);

            // Check the structure of the response
            if (Array.isArray(response)) {
                var omeroHtml = buildScriptMenuHtml(response.find(folder => folder.name === "omero").ul);
                var biomeroHtml = buildScriptMenuHtml(response.find(folder => folder.name === "biomero").ul);

                $("#omero").html(omeroHtml);
                $("#biomero").html(biomeroHtml);

                // Show the default tab (omero)
                openTab(null, 'omero');
            } else {
                console.error("Unexpected response format:", response);
                $("#widget_window").html("<p>Error loading script menu.</p>");
            }
        });
    }

    // Function to build the script menu HTML
    function buildScriptMenuHtml(scriptMenu) {
        var html = '';
        scriptMenu.forEach(function(item) {
            if (item.ul) {
                // Directory node
                html += '<div class="directory">';
                html += '<div class="subdirectory-header">' + item.name + '</div>';
                html += '<div class="script-cards-container">' + buildScriptMenuHtml(item.ul) + '</div>';
                html += '</div>';
            } else if (item.id) {
                // Leaf node (script)
                var scriptName = item.name.replace('.py', ''); // Remove the '.py' suffix
                html += '<div class="script-card"><a href="' + item.href + '" class="script-link" data-id="' + item.id + '">' + scriptName + '</a></div>';
            }
        });
        return html;
    }

    // Function to open a tab
    window.openTab = function(event, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        if (event) {
            event.currentTarget.className += " active";
        } else {
            document.querySelector(".tablink[onclick=\"openTab(event, '" + tabName + "')\"]").classList.add("active");
        }
    }

    // Function to search scripts
    window.searchScripts = function() {
        var input, filter, scriptCards, i;
        input = document.getElementById("searchBar");
        filter = input.value.toLowerCase();
        scriptCards = document.getElementsByClassName("script-card");
        for (i = 0; i < scriptCards.length; i++) {
            if (scriptCards[i].innerHTML.toLowerCase().indexOf(filter) > -1) {
                scriptCards[i].style.display = "";
            } else {
                scriptCards[i].style.display = "none";
            }
        }
    }

    // Fetch and render the script menu on page load
    fetchScriptMenu();

    // Bind click event to script cards
    $("#widget_window").on('click', '.script-card', function(event) {
        event.preventDefault();
        var scriptLink = $(this).find('a.script-link');
        var scriptId = scriptLink.data('id');
        var scriptHref = scriptLink.attr('href');
        console.log("Clicked script ID:", scriptId, "with href:", scriptHref);
        // Open script window or handle script execution here
        // For now, just log the script ID and href
        window.open(scriptHref, '_blank'); // This will open the href in a new tab
    });
});