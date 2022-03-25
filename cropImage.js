var app = angular.module("plunker", ["ui.bootstrap", "uiCropper"]);

app.directive("testDirective", [
  function () {
    return {
      template: `<div class="cropArea" ng-show="myVar">
      <ui-cropper image="myImage" area-type="square" area-min-size={w:120,h:125} area-init-size="{ w:120,h:125}" area-init-coords={x:107,y:125}  result-image="squareCroppedImage" result-image-format="image/jpeg"></ui-cropper>
    </div> <div class="cropArea" ng-show="myVar1">
      <ui-cropper image="myImage" area-type="rectangle" area-min-size={w:138,h:58} area-init-size="{w:138, h:58}" area-init-coords={x:105,y:250} result-image="rectCroppedImage" result-image-format="image/jpeg"></ui-cropper>
    </div>
    `,
      controller: function ($scope) {
        $scope.squareCropping = function () {
          $scope.myVar = 1;
          $scope.myVar1 = 0;
        };

        $scope.rectangleCropping = function () {
          $scope.myVar = 0;
          $scope.myVar1 = 1;
          document.getElementById("sig").style = "display:";
        };
      },
    };
  },
]);

app.controller("MainCtrl", function ($scope, $uibModal, $log) {
  $scope.animationsEnabled = true;

  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: "myModalContent.html",
      controller: "ModalInstanceCtrl",
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        },
      },
    });
  };
});
app.controller(
  "ModalInstanceCtrl",
  function ($scope, $timeout, $uibModalInstance, items) {
    $scope.squareCroppedImage = "";
    $scope.myImage = "";
    $scope.rectCroppedImage = "";
    $scope.myVar = 1;
    $scope.myVar1 = 0;

    var handleFileSelect = function (evt) {
      var file = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function ($scope) {
          $scope.myImage = evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    $timeout(
      function () {
        angular
          .element(document.querySelector("#fileInput"))
          .on("change", handleFileSelect);
      },
      1000,
      false
    );

    $scope.ok = function () {
      console.log($scope.squareCroppedImage);
      console.log($scope.rectCroppedImage);
    };

    $scope.cancel = function () {
      console.log("add functionality");
    };
  }
);
