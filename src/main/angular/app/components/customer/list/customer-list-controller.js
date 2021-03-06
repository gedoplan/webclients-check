(function () {
    "use strict";

    angular.module("GedoplanWebClients.customer.list", ['GedoplanWebClients.services.customer'])
            .controller("customer-list", function (customerService, tableHelper, $translate, $state) {
                var context = this;

                tableHelper.getTranslation().then(function (result) {
                    context.initTable(result.data);
                });

                this.initTable = function (translation) {
                    jQuery('#customerlist').DataTable({
                        ajax: function (data, callback, settings) {
                            var restSettings = tableHelper.parseRestSettings(data, settings);
                            customerService.getCustomer(restSettings).$promise.then(function (response) {
                                callback({
                                    data: response.result,
                                    recordsTotal: response.resultCount,
                                    recordsFiltered: response.resultCount
                                });
                            });
                        },
                        serverSide: true,
                        searching: false,
                        language: translation,
                        columns: [
                            {title: $translate.instant("customer.id"), type: 'html', data: "customerID",
                                render: function (data) {
                                    return '<a>' + data + '</a>';
                                },
                                createdCell: function (td, cellData, rowData) {
                                    jQuery(td).find("a").on("click", function () {
                                        $state.transitionTo('app.customer-detail', {id: rowData.customerID});
                                    });
                                }
                            },
                            {title: $translate.instant("customer.name"), data: "companyName"},
                            {title: $translate.instant("customer.contact"), data: "contactName"},
                            {title: $translate.instant("customer.street"), data: "address"},
                            {title: $translate.instant("customer.zipcode"), data: "postalCode"},
                            {title: $translate.instant("customer.city"), data: "city"}
                        ]
                    });
                }
            });
})();


