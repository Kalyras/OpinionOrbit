module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "10"
                }
            }
        ],
        '@vue/cli-plugin-babel/preset'
    ]
}