const { Module } = require("webpack");

Module.export={
    entry:{
        app:'./main.ja',
    },
    module:{
        rules:[{

        }],

    },
    plugin:[],
    output:{
        filename:'app.js',
        path:'./dist',
    },
};