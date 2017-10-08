import './tablet_arbo.html';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.tablet_arbo.onRendered(function (){
        setTimeout(function(){
            $('.problem').addClass('active');
        },50);

        $('.select-bar').on('click', function(){
            $(this).toggleClass('active');
        })
});

Template.tablet_arbo.helpers({
    isCat_id(cat_id) {
        console.log(FlowRouter.getQueryParam('cat_id') , cat_id);
        return cat_id == FlowRouter.getQueryParam('cat_id');
    }
});