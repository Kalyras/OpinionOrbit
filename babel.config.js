module.exports = {
    presets: [
        ["@babel/env", {
            "targets": {
                "node": "current"
            }
        }],
        '@vue/cli-plugin-babel/preset'
    ]
}