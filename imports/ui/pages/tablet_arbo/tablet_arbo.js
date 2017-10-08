import './tablet_arbo.html';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';

import { Categories } from '/imports/api/categories/categories.js';

Template.tablet_arbo.onCreated(function() {
    const instance = this;
    instance.isLast = new ReactiveVar(false);
});

Template.tablet_arbo.onRendered(function (){
    setTimeout(function(){
        $('.problem').addClass('active');
    },50);

    $('.select-bar').on('click', function(){
        console.log('yaya');
        $(this).toggleClass('active');
    })
});

Template.tablet_arbo.helpers({
    userPath() {
        return Session.get('userPath');
    },
    categories() {
        let categoryId = FlowRouter.getParam('categoryId');
        if (!categoryId) {
            categoryId = 'y37yNuM3iiStgqj29';
        }
        const category = Categories.findOne({ _id: categoryId});
        if (category) {
            const subCategs = category.subCategories.split(',');
            const categories = Categories.find({ _id: { $in: subCategs}}).fetch();
            if (categories) {
                _.each(categories, function (category) {
                    console.log(category);
                   if (category.type === 'help' || category.type === 'ticket') {
                       Template.instance().isLast.set(true);
                   }
                });
                return categories;
            }
        }
    },
    categoryId() {
        return FlowRouter.getParam('categoryId');
    },
    isLast() {
        return Template.instance().isLast.get();
    }
});

Template.tablet_arbo.events({
    'click .category'() {
        let userPath = Session.get('userPath');
        if (!userPath) {
            userPath = [];
        }
        userPath.push({ _id: this._id, name: this.name });
        Session.set('userPath', userPath);
        FlowRouter.go(`/tablet/arbo/${this._id}`);
    },
    'click .select-bar'(event) {
        $(event.currentTarget).toggleClass('active');
    },
    'click .select'() {
        let userPath = Session.get('userPath');
        if (!userPath) {
            userPath = [];
        }
        userPath.push({ _id: this._id, name: this.name });
        Session.set('userPath', userPath);
        FlowRouter.go(`/tablet/ticket`);
    },
});
