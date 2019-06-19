module.exports = {
    extends: [          
        '@yt/eslint-config-react'
    ],
    plugins: ["react-hooks"],
    rules: {
        "react-hooks/rules-of-hooks": 'error',
        "react-hooks/exhaustive-deps": 'warn' // <--- THIS IS THE NEW RULE
    },
    globals: {
    }
};