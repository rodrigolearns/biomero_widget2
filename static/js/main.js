var jQueryNoConflict = jQuery.noConflict(true);

jQueryNoConflict(document).ready(function($) {
    $("#draggable").draggable().resizable();

    // Sample script structure with updated script names
    var sampleScripts = [
        {
            "name": "biomero",
            "ul": [
                {"name": "Script 1", "id": 1},
                {"name": "Script 2", "id": 2}
            ]
        },
        {
            "name": "omero",
            "ul": [
                {
                    "name": "analysis_scripts",
                    "ul": [
                        {"name": "Script 3", "id": 3},
                        {"name": "Script 4", "id": 4},
                        {"name": "Script 5", "id": 5}
                    ]
                },
                {
                    "name": "annotation_scripts",
                    "ul": [
                        {"name": "Script 6", "id": 6},
                        {"name": "Script 7", "id": 7}
                    ]
                },
                {
                    "name": "export_scripts",
                    "ul": [
                        {"name": "Script 8", "id": 8},
                        {"name": "Script 9", "id": 9}
                    ]
                },
                {
                    "name": "import_scripts",
                    "ul": [
                        {"name": "Script 10", "id": 10}
                    ]
                }
            ]
        }
    ];

    // Function to fetch and render the script menu
    function fetchScriptMenu() {
        var omeroHtml = buildScriptMenuHtml(sampleScripts[1].ul);
        var biomeroHtml = buildScriptMenuHtml(sampleScripts[0].ul);
        
        $("#omero").html(omeroHtml);
        $("#biomero").html(biomeroHtml);

        // Show the default tab (omero)
        openTab(null, 'omero');
    }

    // Function to build the script menu HTML
    function buildScriptMenuHtml(scriptMenu) {
        var html = '';
        scriptMenu.forEach(function(item) {
            if (item.id) {
                // Leaf node (script)
                html += '<div class="script-card">' + item.name + '</div>';
            } else {
                // Directory node
                html += '<div class="subdirectory-header">' + item.name + '</div>';
                html += '<div class="script-cards-container">' + buildScriptMenuHtml(item.ul) + '</div>';
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
});
