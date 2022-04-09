module.exports = app => {
    const transcribe = app.data.transcribe;
    const controller = {};

    controller.transcribe = (req, res) => res.status(200).json(transcribe);

    return controller;
}