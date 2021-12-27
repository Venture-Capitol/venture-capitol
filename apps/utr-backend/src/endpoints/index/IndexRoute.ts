import express = require("express");
import { Router } from "express";
const router = Router();
import { isAuthenticatedAsAdmin } from "../utils/AuthenticationUtils";

/* GET home page. */
router.get("/", isAuthenticatedAsAdmin, function (req, res, next) {
	/* res.render('index', { title: 'Express' }); */
	res.status(200).end();
});

module.exports = router;
