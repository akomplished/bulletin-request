(function () {
    window.onLoadAuthJS = function () {
        google.load("visualization", "1", { "callback": onVisualLoad });
    };

    onVisualLoad = function () {
        var querystring = encodeURIComponent('select A, B, C, D, E, F, G, H, I, J, K, L where L = "Pending"');
        var request = new google.visualization.Query('https://docs.google.com/a/mrpkedu.org/spreadsheets/d/1Df0VVPUabFqqMHJ96NUvEv0AI6mFtCzgeSb2VAiIFHM/gviz/tq?sheet=NewRequests&tq=' + querystring);
        console.log(querystring);
        request.send(handleRequest);
    };

    var handleRequest = function (response) {
        var objs = [];
        var result = $.parseJSON(response.getDataTable().toJSON());

        for (var i = 0; i < result.rows.length; i++) {
            var obj = {};
            for (var o in result.cols) {
                if (result.cols[o].type == 'datetime')
                    obj[result.cols[o].label] = result.rows[i].c[o].f;
                else if (result.cols[o].type == 'date')
                    obj[result.cols[o].label] = result.rows[i].c[o].f;
                else
                    obj[result.cols[o].label] = result.rows[i].c[o].v;
            }
            objs.push(obj);
        }

        var groups = {};
        for (var item in objs) {
            var group = objs[item].Category;
            if (!(group in groups)) {
                var counter = 1;
                groups[group] = {
                    event: [objs[item]]
                };
            } else {
                groups[group].event.push(objs[item]);
            }
        }
        fillTable(groups, loadHtml);
    };

    function fillTable(groups, callback) {
        var html = "";
        for (var group in groups) {
            var table = "<h5 class='ui-widget-header' style='margin: 0.2em 0 0 0; padding: 0.2em 0 0.2em 0.5em'>" + group + "</h5>";
            table += "<table class=\"tblgroup\" cellspacing=\"0\" style=\"border-spacing: 0;\"><thead><tr>";
            table += "<th><input type='checkbox' name='selectall' id='input-selectall' onchange='checkall(this)' /></th>"
            table += "<th>TimeStamp</th>";
            table += "<th>Submitted By</th>";
            table += "<th>Organization</th>";
            table += "<th>Run Dates</th>";
            table += "<th>Message</th>";
            table += "</tr></thead><tbody>";
            for (var i = 0; i < groups[group].event.length; i++) {
                table += "<tr class='row-display' data-row='" + groups[group].event[i].Row + "'>";
                table += "<td><input type='checkbox' name='selected' id='input-selected' value='" + groups[group].event[i].Row + "' /></td>"
                table += "<td>" + convertDate(groups[group].event[i].TimeStamp) + "</td>";
                table += "<td>" + groups[group].event[i].SubmittedBy + "</td>";
                table += "<td>" + groups[group].event[i].Organization + "</td>";
                table += "<td id='rundates'>" + groups[group].event[i].RunDates + "</td>";
                table += "<td>" + groups[group].event[i].Message + "</td></tr>";
                table += "<tr class='row-details collapsed'><td colspan='6' style='background-color: rgba(155, 186, 156, 0.2); border: 1px solid #D1D1D1; padding: 10px 0 10px 0; '>";
                table += "<div class='grid-parent'>"
                table += "<form id='form_" + groups[group].event[i].Row + "' data-row='" + groups[group].event[i].Row + "'>";
                table += "<div class='grid-25'>";
                table += "<label>Event Name: </label><input type='text' name='EventName' id='input-eventname' value='" + groups[group].event[i].EventName + "' style='width: 100%'/>";
                table += "<label>Event Location: </label><input type='text' name='EventLocation' id='input-eventlocation' value='" + groups[group].event[i].EventLocation + "' style='width: 100%'/>";
                table += "<label>Event Date: </label><input type='text' name='EventDate' id='input-eventdate_" + groups[group].event[i].Row + "' class='eventdates' value='" + groups[group].event[i].EventDate + "' style='width: 60%'/>";
                table += "</div>";
                table += "<div class='grid-25'>";
                table += "<label>Organization: </label><input type='text' name='Organization' id='input-organization' value='" + groups[group].event[i].Organization + "' style='width: 99%' readonly/>";
                table += "<label>Bulletin Category: </label><select form='form_" + groups[group].event[i].Row + "' id='input-category' name='Category' style='width: 100%'><option value='CollegeCareer'>College and Career</option><option value='Counseling'>Counseling</option><option value='Club'>Club</option><option value='General'>General</option><option value='ClassOf'>Class Of</option><option value='SchoolEvent'>SchoolEvent</option><option value='Athletics'>Athletics</option></select>";
                table += "</div>";
                table += "<div class='grid-50'>";
                table += "<label>Message: </label><textarea form='form_" + groups[group].event[i].Row + "' name='Message' id='input-message' rows='6' style='width: 100%; height: 79px; display: block;'>" + groups[group].event[i].Message + "</textarea>";
                table += "</div>";
                table += "<div class='grid-75 date-container' onclick=\"$('#input-rundates_" + groups[group].event[i].Row + "').focus();\">";
                table += "<label>Run Dates: </label><input type='text' form='form_" + groups[group].event[i].Row + "' name='RunDates' id='input-rundates_" + groups[group].event[i].Row + "' class='rundates' value='" + groups[group].event[i].RunDates + "' style='width: 100%;'/>";
                table += "</div>";
                table += "<center><button type='submit' class='ui-button ui-state-default ui-corner-all' id='btn-update' style='margin-top: 0.2em;' form='form_" + groups[group].event[i].Row + "'>Update & Approve</button></center>";
                table += "</form>";
                table += "</div>";
                table += "</div>";
                table += "</td></tr>";
            }
            table += "</tbody></table>"
            html += table;
        }
        callback(html);
    }
    
    function selectCatagory(tar, opt) {
        $(tar + 'option').each(function (a, b) {
            console.log(b);
        });
    }


    var loadHtml = function (html) {
        $("#tabs-pending div").html(html);
        $(".row-details .rundates").multiDatesPicker({
            dateFormat: 'mm/dd/yy',
            minDate: $.datepicker.formatDate('mm/dd/yy', new Date()),
            beforeShowDay: $.datepicker.noWeekends,
        });
        $(".row-display").children('td').hover(function () {
            $(this).parent('tr').toggleClass('on-hover');
        });
        createDatePicker();

        $("form").on('submit', function (event) {
            $("button").attr("disabled", "disabled");
            $('#container').show();
            var formId = $(this).attr("id");
            if (document.forms[formId].checkValidity()) {
                console.log(formId);
                event.preventDefault();
                var data = {
                    function: 'updateRequest',
                    payload: {
                        Row: $(this).data('row'),
                        Status: 'Approved'
                    }
                };
                $("#" + formId + " :input:not([readonly]), #" + formId + " textarea, #" + formId + ":selected").each(function () {
                    if (data.payload[this.name] !== undefined) {
                        if (!data.payload[this.name].push) {
                            data.payload[this.name] = [data.payload[this.name]];
                        }
                        data.payload[this.name].push(this.value || '');
                    } else {
                        if ($(this).is("OPTION")) {
                            data.payload["Category"] = this.value;
                        } else {
                            data.payload[this.name] = this.value || '';
                        }
                    }
                });
                setTimeout('$("button").removeAttr("disabled")', 2000);
                postFormData(data);
            } else {
                event.preventDefault();
                return false;
            }
        });

        $(".event-table .tblgroup tbody tr.row-display:not(.row-details) td").hover(function () {
            $(this).parent().children().toggleClass("ui-state-hover");
        })

        $(".row-display td:not(:first-child)").click(function (e) {
            var row = $(this).parent('tr').data('row');
            var _this = $('tr[data-row="' + row + '"]');

            if ($(_this).next(".row-details").is(".expanded")) {
                $(_this).next(".row-details").toggleClass("expanded collapsed");
                $("td.ui-state-active").removeClass("ui-state-active");
                return;
            } else {
                $(".expanded").toggleClass("expanded collapsed");
                $("td.ui-state-active").removeClass("ui-state-active");
            }
            $(_this).next(".row-details").toggleClass("expanded collapsed");
            $(_this).children("td").addClass("ui-state-active");
        });
    };

    function createDatePicker() {
        try {
            $(".eventdates").datepicker({
                dateFormat: 'mm/dd/yy',
                beforeShowDay: $.datepicker.noWeekends,
            });
            $(".rundates").multiDatesPicker({
                dateFormat: 'mm/dd/yy',
                minDate: $.datepicker.formatDate('mm/dd/yy', new Date()),
                beforeShowDay: $.datepicker.noWeekends,
            });
        } catch (ex) {
            console.log(ex.message);
        }
    }

    function convertDate(input) {
        var y = input.substring(0, 4);
        var mon = (parseInt(input.substring(4, 6),10) - 1);
        var d = input.substring(6, 8);
        var h = input.substring(8, 10);
        var min = input.substring(10, 12);
        var da = new Date(y, mon, d, h, min).toLocaleDateString('en-US');
        return da;
    }

    Date.prototype.addMonth = function (month) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getMonth() + month);
        return dat;
    };
})();

