app = angular.module("mySellerList", []);
app.controller("sellerController", function($scope) {
    $scope.currencies = [];
    $scope.addCurrency = function (){
        if (!$scope.newCurr){return;}
        if ($scope.currencies.indexOf($scope.newCurr) === -1){
            $scope.currencies.push($scope.newCurr);
        }
    };
    $scope.showCurr = function (curr) {
        return !$scope.currencies.includes(curr);
    };
    $scope.removeCurr = function (x) {
        $scope.currencies.splice(x,1);
        $scope.newCurr = $scope.currencies[-1]
    };

    $scope.offices = [];
    $scope.addOffice = function (){
        if (!$scope.newOff){return;}
        if ($scope.offices.indexOf($scope.newOff) === -1){
            $scope.offices.push($scope.newOff);
        }
    };
    $scope.showOff = function (off) {
        return !$scope.offices.includes(off);
    };
    $scope.removeOff = function (x) {
        $scope.offices.splice(x,1);
        $scope.newOff = $scope.offices[-1]
    };

    $scope.emptyForm = function (){
        $scope.name = "";
        $scope.nameError = "";
        $scope.currencies = [];
        $scope.newCurr = $scope.currencies[-1];
        $scope.currError = "";
        $scope.offices = [];
        $scope.newOff = $scope.offices[-1];
        $scope.offError = "";
        $scope.bid_deal = false;
        $scope.gua_deal = false;
        $scope.dealError = "";
        $scope.contact = "";
        $scope.email = "";
        $scope.emailError = "";
    };

    $scope.saveSeller = function () {
        if (isValidSeller()) addSeller();
    };
    let isValidSeller = function () {
        let required = "This field is required";
        $scope.nameError = ($scope.name) ? "" : required;
        $scope.currError = ($scope.currencies.length) ? "" : required;
        $scope.offError = ($scope.offices.length) ? "" : required;
        $scope.dealError = ($scope.bid_deal || $scope.gua_deal) ? "" : required;
        $scope.emailError = (isValidEmail()) ? "" : "Invalid email";
        return !$scope.nameError && !$scope.currError && !$scope.offError && !$scope.dealError && !$scope.emailError;
    };
    let isValidEmail = function () {
        if (!$scope.email) return true;
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return mailFormat.test($scope.email);
    };

    $scope.sellerList = [];
    $scope.sellerIndex = -1;
    let addSeller = function () {
        let seller = {
            name: $scope.name,
            contact: $scope.contact,
            email: $scope.email,
            currencies: $scope.currencies,
            offices: $scope.offices,
            bid: ($scope.bid_deal) ? "Yes" : "No",
            gua: ($scope.gua_deal) ? "Yes" : "No"
        };
        if ($scope.sellerIndex === -1) {
            $scope.sellerList.push(seller);
        } else {
            $scope.sellerList[$scope.sellerIndex] = seller;
        }
        $scope.emptyForm();
    };
    $scope.removeSeller = function (x) {
        $scope.sellerList.splice(x, 1);
    };
    $scope.updateSeller = function (x) {
        let seller = $scope.sellerList[x];
        $scope.name= seller.name;
        $scope.currencies = seller.currencies.slice(0);
        $scope.newCurr = $scope.currencies[-1];
        $scope.offices = seller.offices.slice(0);
        $scope.newOff = $scope.offices[-1];
        $scope.bid_deal = (seller.bid === "Yes");
        $scope.gua_deal = (seller.gua === "Yes");
        $scope.contact = seller.contact;
        $scope.email = seller.email;
        $scope.sellerIndex = x;
    };
});