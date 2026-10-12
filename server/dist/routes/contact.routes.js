"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_js_1 = require("../controllers/contact.controller.js");
const router = (0, express_1.Router)();
router.post('/', contact_controller_js_1.handleContactSubmission);
exports.default = router;
