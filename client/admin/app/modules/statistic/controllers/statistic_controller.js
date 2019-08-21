"use strict";

import Controller from '../../common/controllers/controller';

/**
 * RoomsListController controller.
 */

export default class BlocksListController extends Controller {
  static $inject = ['block', 'StatisticResource', '$stateParams'];

  constructor() {
    super(arguments);

    this.blockId = this.injections.block.id;

    this.loadStatistic()
      .then(this.fillListOfStatistic.bind(this));
  }

  loadStatistic() {
    return this.injections.StatisticResource.get({blockId: this.blockId}).$promise;
  }

  fillListOfStatistic(data) {
    this.visits = data.response.visits;
    this.questions = data.response.questions;
    this.opens = data.response.opens;
    this.contacts = data.response.contacts;
  }

  isDataLoaded() {
    return !!this.questions;
  }

  getConversion(quantity, total) {
    if(total === 0) {
      return null;
    }

    return (quantity / total * 100).toFixed(2).replace(/[.,]00$/, "");
  }

}