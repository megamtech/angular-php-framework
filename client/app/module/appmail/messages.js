(function () {

    'use strict';
    angular
            .module('1grandtrunk')
            .controller('MessageController', MessageController);
    function MessageController(APIService, $state, NgTableParams, UIService, UserService, $scope, $rootScope) {
        var vm = this;
        $rootScope.header_messages = {};
        vm.folders = {
            'inbox': {
                name: 'Inbox',
                url: '#/messages/inbox',
                class: 'active',
                type: 'inbox'

            },
            'trash': {
                name: 'Trash',
                url: '#/messages/trash',
                type: 'trash'

            },
            'drafts': {
                name: 'Drafts',
                url: '#/messages/draft',
                type: 'draft'

            },
            sentmail: {
                name: 'Sent',
                url: '#/messages/sent',
                type: 'sent'
            }
        };
        vm.message_statuses = [
            {'name': 'Read', value: 'read'},
            {'name': 'Unread', value: 'unread'},
            {'name': 'Stared', value: 'star'},
        ];
        vm.current_folder = $state.params.folder;
        vm.showmessage = false;

        vm.getUserMessages = function () {
            APIService.post('messages', 'list', {type: $state.params.folder}).success(function (data) {
                vm.messages = data;
                vm.getRecentUnreadMessages();
            }).error(function () {

            });
        };
        vm.getRecentUnreadMessages = function (count) {
            count = count ? count : 5;
            APIService.post('messages', 'list', {type: 'inbox', is_read: 'false', count: count}).success(function (data) {
                $rootScope.header_messages.data = data;

                $rootScope.header_messages.count = data.length;
                console.log($rootScope.header_messages);
            }).error(function () {
            });
        };
        vm.loadAddresses = function (query) {

            APIService.post('messages', 'getcontacts', {"filter": {query: query}}).success(function (data) {
                vm.contacts = data.response;
            });

            return vm.contacts;

        };
        //        vm.defaultContacts={
        //            'admin':{
        //
        //            }
        //        }
        vm.sendMessage = function () {
            APIService.post('messages', 'send', {to: vm.to, subject: vm.subject, content: vm.content, muid: $state.params.id}).success(function (data) {
                UIService.notify('Message Sent Successfully !!!', 'success');
                $state.go('messageinbox');
            }).error(function () {

            });


        };
        vm.createDraft = function () {

            APIService.post('messages', 'draft', {to: vm.to, content: vm.content, subject: vm.subject}).success(function (data) {
                $state.go('messageinbox');
                UIService.notify('Message Moved Successfully to Draft ', 'success');
            });
        };

        vm.moveMessageTo = function (folderto, folderfrom) {
            var message_id = $state.params.id;
            APIService.post('messages', 'moveto', {muid: message_id, foldername: folderto}).success(function (data) {
                $state.go('messageinbox', {folder: folderfrom});
                UIService.notify('Message Moved Successfully to ' + folderto, 'success');
            }).error(function () {

            });
        };
        vm.getUserContacts = function () {

        };
        vm.loadMessage = function () {
            if ($state.params.id != '') {
                APIService.post('messages', 'view', {muid: $state.params.id}).success(function (data) {
                    vm.current_message_thread = data;
                    vm.content = vm.current_message_thread.content_html;
                    vm.subject = vm.current_message_thread.subject;
                    vm.to = vm.current_message_thread.to;
                    vm.getRecentUnreadMessages();

                }).error(function () {

                });
            }
        };
        vm.openMessage = function (current_messageid, folder_type) {
            if (folder_type == 'draft') {
                $state.go('messagecomposedraft', {id: current_messageid});
            } else {
                $state.go('messageview', {id: current_messageid});
            }



        };
        vm.replyToMessage = function () {

        };
        vm.changeMessageStatus = function () {

        };
    }
})();
