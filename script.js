$(document).ready(function () {
    $.get('http://starlord.hackerearth.com/bankAccount').then(response => {
        window.response = response;
        let str = ''
        for (let i = 0; i < response.length; i++) {
            str += getTemplate(response[i]);
        }
        $('tbody').append(str);
        $.fn.dataTable.moment('D MMM YY');
        $('#example').DataTable();
        $('#chartContainer').show();
        createChart(response);

        $('#filterForm').submit(function(evt){
            evt.stopPropagation();
            evt.preventDefault();
            let fromDate = $('#fromDate').val();
            let toDate = $('#toDate').val();
            if(!fromDate || !toDate) {
                createChart(response);
                return;
            }
            fromDate = new Date(fromDate), toDate = new Date(toDate);
            let filterData = response.filter(item => {
                return new Date(item['Date']) >= fromDate && new Date(item['Date']) <=toDate;
            });
            if(!filterData.length) {
                alert('No Data Found');
            }
            createChart(filterData);
        })
    });
});

function createChart(response) {
    let wa = response.reduce((a, c) => a + Number(c['Withdrawal AMT'].split(',').join('')), 0);
    let da = response.reduce((a, c) => a + Number(c['Deposit AMT'].split(',').join('')), 0);
    let ba = response.reduce((a, c) => a + Number(c['Balance AMT'].split(',').join('')), 0);
    var ctx = document.getElementById('myChart').getContext('2d');
    var data = {
        datasets: [{
            data: [wa, da, ba],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Withdrawal AMT',
            'Deposit AMT',
            'Balance AMT'
        ]
    };
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data
    });
}

function getTemplate(item) {
    return `<tr>
        <td>${item['Account No']}</td>
        <td>${item['Date']}</td>
        <td>${item['Transaction Details']}</td>
        <td>${item['Value Date']}</td>
        <td>${item['Withdrawal AMT']}</td>
        <td>${item['Deposit AMT']}</td>
        <td>${item['Balance AMT']}</td>
    </tr>`
}