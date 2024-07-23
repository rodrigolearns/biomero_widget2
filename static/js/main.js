var jQueryNoConflict = jQuery.noConflict(true);

jQueryNoConflict(document).ready(function($) {
    $("#draggable").draggable().resizable();

    // Function to fetch and render the script menu
    function fetchScriptMenu() {
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

        // Simulate an AJAX request to fetch the script menu
        setTimeout(function() {
            var scriptMenuHtml = buildScriptMenuHtml(sampleScripts, 1);
            $("#draggable").html(scriptMenuHtml);

            // Bind click event to directory links
            $("#draggable").on('click', 'a.directory', function(event) {
                event.preventDefault();
                var $a = $(this);
                var $ul = $a.next('ul');
                $ul.toggle();
            });
        }, 1000); // Simulate network delay
    }

    // Function to build the script menu HTML
    function buildScriptMenuHtml(scriptMenu, level) {
        var html = '<div class="script-menu"><ul>';
        scriptMenu.forEach(function(item) {
            if (item.id) {
                // Leaf node (script)
                html += '<li class="script"><a href="/webclient/script_ui/' + item.id + '/">' + item.name + '...</a></li>';
            } else {
                // Directory node
                var folderClass = getDirectoryClass(level);
                html += '<li class="' + folderClass + '"><a href="#" class="directory">' + item.name + '</a>';
                if (Array.isArray(item.ul)) {
                    html += '<ul style="display:none">' + buildScriptMenuHtml(item.ul, level + 1) + '</ul>';
                }
                html += '</li>';
            }
        });
        html += '</ul></div>';
        return html;
    }

    // Function to determine the class based on the directory level
    function getDirectoryClass(level) {
        switch (level) {
            case 1:
                return 'directory-level-1';
            case 2:
                return 'directory-level-2';
            case 3:
                return 'directory-level-3';
            default:
                return 'directory-level-3'; // Use directory-level-3 for any deeper levels
        }
    }

    // Fetch and render the script menu on page load
    fetchScriptMenu();
});
