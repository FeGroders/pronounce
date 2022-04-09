module.exports = app => {
    const controller = app.controllers.transcribe;
  
    app.route('/api/v1/transcribe')
      .get(controller.transcribe);
  }