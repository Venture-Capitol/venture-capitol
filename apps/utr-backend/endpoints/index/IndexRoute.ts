import express = require("express");
import { Router } from "express";
const router = Router();
import { isAuthenticated } from "../utils/AuthenticationUtils";

/* GET home page. */
router.get("/", isAuthenticated, function (req, res, next) {
	/* res.render('index', { title: 'Express' }); */
	res.status(200).end();
});

module.exports = router;
