import express = require("express");
import { Router } from "express";
const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	/* res.render('index', { title: 'Express' }); */
	res.status(200).end();
});

module.exports = router;
