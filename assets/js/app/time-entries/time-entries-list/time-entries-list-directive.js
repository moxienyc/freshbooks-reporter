angular.module('timeEntries.list-directive', [
  'timeEntries.api',
  'filters.by-contractor'
])

.directive('timeEntriesList', ['timeEntries', function (timeEntries) {
  return {
    restrict: 'A',
    replace: false,
    templateUrl: 'templates/time-entries/time-entries-list/time-entries-list.tpl.html',
    scope: {
      projects: '=',
      contractors: '=',
      currentContractor: '='
    },
    link: function($scope, $element, $attrs) {
      var parseTimeEntries = function(timeEntries) {
        return _.map(timeEntries, function(timeEntry) {
          timeEntry.contractor = _.find($scope.contractors, {staff_id: timeEntry.staff_id});
          timeEntry.project = _.find($scope.projects, {project_id: timeEntry.project_id});
          return timeEntry;
        });
      };

      $scope.dateFilters = [
        {
          name: "Today",
          dayOffset: 0
        }, {
          name: "This Week",
          dayOffset: 7
        }, {
          name: "This Month",
          dayOffset: 30
        }, {
          name: "Last Year",
          dayOffset: 365
        }
      ];

      $scope.setDateFilter = function(dateFilter) {
        $scope.currentDateFilter = dateFilter;
        timeEntries.getAllTimeEntries(dateFilter.dayOffset)
          .then(
            function(response) {
              $scope.timeEntries = parseTimeEntries(response);
          });
      };

      $scope.setDateFilter($scope.dateFilters[0]);
    }
  };
}]);