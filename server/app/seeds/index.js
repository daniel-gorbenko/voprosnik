"use strict";

var models = require('../models');
var constants = require('../../../client/admin/constants');

module.exports = {
  seed: function () {

    models.Template.create({
      css: ".VOPROSNIK-button,.VOPROSNIK-title{font-weight:700;display:block;text-align:center}[class*=VOPROSNIK]{box-sizing:border-box}.VOPROSNIK{transition:.3s ease-in-out right;position:fixed;width:430px;height:400px;right:-500px;top:90px;z-index:9999999999;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:rgba(232,241,245,.3);border-radius:5px 0 0 5px}.VOPROSNIK-modal{border-radius:inherit;width:100%;height:100%;background:#fff;position:relative;border:1px solid #E6EAEE;border-right:none;box-shadow:-10px 0 15px 0 rgba(0,0,0,.1),0 15px 20px 0 rgba(0,0,0,.15)}.VOPROSNIK--active{right:0}.VOPROSNIK-close{background:url('//cdn.savevisitor.com/img/close.png') center center no-repeat no-repeat;background-size:13px;border-radius:30px;position:absolute;top:10px;left:10px;border:1px solid #333;width:40px;height:40px;cursor:pointer;opacity:.4}.VOPROSNIK-close:hover{opacity:.8}.VOPROSNIK-page{height:100%;overflow:hidden}.VOPROSNIK-title{font-size:26px;color:#324460;padding:50px 30px 0}.VOPROSNIK-block_button{display:block;width:100%;background:#f7f7f7;height:100px;padding-top:26px}.VOPROSNIK-button{position:absolute;bottom:38px;right:0;left:0;font-size:18px;color:#fff;width:350px;padding:10px 20px;background:#5f9ed3;border-radius:30px;margin:0 auto;cursor:pointer}.VOPROSNIK-question .VOPROSNIK-button{position:absolute;right:0;left:0;bottom:38px;margin:0 auto}.VOPROSNIK-question-content{width:100%;position:absolute;top:145px;right:0;text-align:center;padding:0 30px}input[type=text].VOPROSNIK-question-input{display:block;text-align:center;width:350px;margin:50px auto 0;padding:10px;border-radius:30px;border:1px solid #e2e6ed;box-shadow:0 1px 1px rgba(0,0,0,.02) inset;font-size:19px;font-family:inherit;outline:0;background-color:#fff;color:#324460}input[type=text].VOPROSNIK-question-input:focus::-webkit-input-placeholder{color:transparent}input[type=text].VOPROSNIK-question-input:focus:-moz-placeholder{color:transparent}input[type=text].VOPROSNIK-question-input:focus::-moz-placeholder{color:transparent}input[type=text].VOPROSNIK-question-input:focus:-ms-input-placeholder{color:transparent}.VOPROSNIK-question-radio{color:#324460;background-color:#fdfdfd;display:inline-block;padding:10px 20px;font-size:14px;font-weight:400;text-align:center;white-space:nowrap;border:1px solid #324460;border-radius:30px;cursor:pointer;margin:0 10px 10px 0}.VOPROSNIK-question-radio:first-child{margin-top:50px}.VOPROSNIK-question-radio.active,.VOPROSNIK-question-radio:hover{color:#5f9ed3;border-color:#5f9ed3;background:#fcfcfc}.VOPROSNIK-end-page,.VOPROSNIK-success{height:100%;background:#F9FAFC}.VOPROSNIK-end-page .VOPROSNIK-end-description{position:absolute;top:120px;right:0;left:0;margin:0 auto;color:#8a9ab1;padding:30px;font-size:18px;text-align:center}.VOPROSNIK-end-page input[type=text].VOPROSNIK-question-input.VOPROSNIK-question-input{bottom:110px;position:absolute;border:1px dashed #5f9ed3;right:0;left:0}.VOPROSNIK-button--invalid{animation:VOPROSNIK_shake .82s cubic-bezier(.36,.07,.19,.97) both;transform:translate3d(0,0,0);backface-visibility:hidden;perspective:1000px}.VOPROSNIK-success{width:100%;display:block}.checkmark{padding-top:110px;margin:0 auto;display:block;width:128px;height:128px}@keyframes VOPROSNIK_shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-4px,0,0)}40%,60%{transform:translate3d(4px,0,0)}}@media screen and (max-width:800px){.VOPROSNIK{display:none}}",

      name: 'Стандартный',

      container: '<div class="VOPROSNIK" id="VOPROSNIK"><div class="VOPROSNIK-modal"><div id="W_VOPROSU-close" class="VOPROSNIK-close"></div><div id="W_VOPROSU-page" class="VOPROSNIK-page"></div></div></div>',

      startPage: '<div class="VOPROSNIK-start"> <span class="VOPROSNIK-title">{{title}}</span> <div class="VOPROSNIK-button" id="W_VOPROSU-check">{{buttonText}}</div></div>',

      endPage: '<div class="VOPROSNIK-end-page"> <span class="VOPROSNIK-title">{{title}}</span> <div class="VOPROSNIK-end-description">{{description}}</div> <input type="text" id="W_VOPROSU-data" class="VOPROSNIK-question-input" placeholder="{{placeholder}}"/> <div class="VOPROSNIK-button VOPROSNIK-button-end" id="W_VOPROSU-send">{{buttonText}}</div></div>',

      question: '<div class="VOPROSNIK-question"> <span class="VOPROSNIK-title">{{title}}</span> <div class="VOPROSNIK-question-content">{{$question}}</div> <div class="VOPROSNIK-button" id="W_VOPROSU-question-next">{{buttonText}}</div></div>',

      questionText: '<input type="text" id="W_VOPROSU-data" class="VOPROSNIK-question-input" placeholder="{{placeholder}}"/>',

      questionOne: '<div class="VOPROSNIK-question-radio W_VOPROSU-data" data-value="{{id}}">{{value}}</div>',
      questionMany: '<div class="VOPROSNIK-question-radio W_VOPROSU-data" data-value="{{id}}">{{value}}</div>',

      formatLeft: '',

      formatRight: '',
      formatTop: '',
      formatBottom: '',
      successPage: '<div class="VOPROSNIK-success"><img src="//cdn.savevisitor.com/img/check.png" class="checkmark" /> </div>'
    })

    .then(function () {
      //  Trial tariff must be first to know it's id to use as default
      //  tariff for new users.
      return models.Tariff.create({
        name: 'trial',
        responses: 20,
        days: 7,
        price: 0,
        position: 1
      });
    })

    .then(function (trial) {
      models.Tariff.create({
        name: 'company',
        responses: 0,
        days: 30,
        price: 60,
        position: 4
      });

      models.Tariff.create({
        name: 'business',
        responses: 5000,
        price: 15,
        days: 30,
        position: 3
      });

      models.Tariff.create({
        name: 'start',
        responses: 1000,
        price: 7,
        days: 30,
        position: 2
      });

      return trial;
    })

    .then(function (tariff) {
      let accessFrom = new Date();
      let accessTo = new Date();

      //  TODO: hardcoded tariff days
      accessTo.setDate(accessTo.getDate() + 7);

      return models.User.create({
        name: 'Danil Gorbenko',
        email: 'busymangorbenko@gmail.com',
        password: 'arsenal19',
        lang: 'en',
        active: true,
        accessFrom: accessFrom,
        accessTo: accessTo,
        tariffId: tariff.id,
        confirmed: true
      });
    })

    .then(function (user) {
      return models.Widget.create({
        userId: user.id,
        url: 'vk.com'
      });
    })

    .then(function (widget) {
      return models.Block.create({
        userId: widget.userId,
        widgetId: widget.id,
        format: constants.formats.full,
        showType: constants.showTypes.open,
        showDelay: 1,
        cached: false,
        templateId: 1,
        status: constants.status.disabled,
        colorMain: '#5f9ed3',
        colorAdditional: '#ffffff',
        state: constants.blockStates.edit
      });
    })

      .then(function (block) {

        models.StartPage.create({
          userId: block.userId,
          blockId: block.id,
          title: 'Привет. Начальная страница',
          buttonText: 'Начать'
        });

        models.EndPage.create({
          blockId: block.id,
          userId: block.userId,
          description: '',
          title: 'Привет. Финальная страница',
          placeholder: 'busymangorbenko@gmail.com',
          buttonText: 'Получить что-то'
        });

        return models.Question.create({
          userId: block.userId,
          blockId: block.id,
          title: 'Первый вопрос',
          type: constants.questionTypes.one,
          position: 1,
          options: [{value: 'opt-1'}],
          buttonText: 'Дальше'
        }, {
          include: [{model: models.QuestionOption, as: 'options'}]
        })

        .then(function (q) {
          return models.Question.create({
            userId: q.userId,
            blockId: block.id,
            title: 'Второй вопрос',
            position: 2,
            type: constants.questionTypes.many,
            options: [{value: 'opt-1'}, {value: 'opt-3'}],
            buttonText: 'Дальше'
          }, {
            include: [{model: models.QuestionOption, as: 'options'}]
          })
        })

        .then(function (q) {
          return models.Question.create({
            userId: q.userId,
            blockId: block.id,
            title: 'Третий вопрос',
            position: 3,
            type: constants.questionTypes.text,
            placeholder: 'Введите текст',
            buttonText: 'Узнать результат'
          });
        })

        .then(function (q) {
            console.log(q.toJSON());

          return block;
        })

      })

      .then(function (block) {
        return models.AnswerCollection.create({
          blockId: block.id
        });

        //
        //models.AnswerCollection.create({
        //  blockId: block.id
        //})

        //return block;
      })

        .then(function (collection) {

            models.Statistic.create({
              action: constants.statistic.visit,
              blockId: collection.blockId
            });

            //let i = 1;

            for(var i = 1; i <= 3; i++) {

              models.Answer.create({
                answersCollectionId: collection.id,
                value: 'Ответ-' + i,
                questionId: i,
                options: [{
                  questionOptionId: i
                }]
              }, {
                include: [{model: models.AnswerOption, as: 'options'}]
              });

            }

            models.Contact.create({
              answersCollectionId: collection.id,
              value: 'Ответ-' + i,
              endPageId: 1
            });

            //
            //for(var i = 2; i <= 5; i++) {
            //  models.Answer.create({
            //    answersCollectionId: 2,
            //    value: 'i-'+i,
            //    questionId: i,
            //    options: []
            //  });
            //
            //  models.Statistic.create({
            //    action: 'visit',
            //    blockId: block.id
            //  });
            //}

        });

  }
};
