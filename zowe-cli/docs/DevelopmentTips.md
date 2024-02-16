# Development Tips

## Contents

 - [Linking Imperative from source](#linking-imperative-from-source)
 - [Debugging in VS Code](#debugging-in-vs-code)
 - [Profiling with `pprof`](#profiling-with-pprof)
 - [Using Development Mode](#using-development-mode)

## Linking Imperative from source

If you make changes in a local copy of Imperative and want to test them in Zowe CLI, you need to replace the `node_modules/@zowe/imperative` directory with a symlink to the Imperative repo.

To set up this symlink, run the following command at the top level of the Zowe CLI repo:

    npm run link:imperative

The first time this command is run, you may see a warning that "Symlink wanted name was occupied by directory or file" which is safe to ignore.

This command must be repeated to recreate the link after running `npm install` or any other command that updates dependencies in the `node_modules` folder.

**Note:** The command assumes your Imperative repo is located in an `imperative` folder alongside your `zowe-cli` folder. If it is located somewhere else, run the command like this:

    npm run link:imperative -- <pathToImperativeRepo>

## Debugging in VS Code

Create a launch configuration like the following. You can have as many launch configurations as you want, each with their own name and set of arguments.

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Check Status",
            "program": "${workspaceFolder}/packages/cli/lib/main.js",
            "args": ["zosmf", "check", "status"],
            "outputCapture": "std"
        }
    ]
}
```

To debug Jest tests in VS Code, the [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) extension may come in handy.

## Profiling with `pprof`

`pprof` requires two components:

* The [Node.js package](https://www.npmjs.com/package/pprof) to record profile data, which can be installed with the command `npm install -g pprof`.
* The [Go CLI](https://github.com/google/pprof) to view profile data, which can be installed following the instructions below:
  * Install a supported version of the Go development kit (available as the `golang` package from `apt-get` or Chocolatey).
  * Install Graphviz to render graphs of profile data (available as the `graphviz` package from `apt-get` or Chocolatey).
  * Install the binary for the `pprof` CLI: `go install github.com/google/pprof@latest`
    **Note:** If you have an old version of Go, installing the binary may fail. You can skip it and invoke the `pprof` CLI packaged with Go instead using the command `go tool pprof`.

Set the environment variable `NODE_OPTIONS="--require pprof"` to enable the profiler. Then run a Zowe CLI command like `npx zowe zosmf check status`.

After the command completes, profile data will be saved to the current directory in `pprof-profile-${process.pid}.pb.gz`. To view this data in your browser, open the file with `pprof`:
```shell
pprof -http=: pprof-profile-${process.pid}.pb.gz
```

## Using Development Mode

To enable development mode, set the environment variable `NODE_ENV=development` when running Zowe CLI.

The following behaviors will change:
* Default log levels for Imperative and Zowe CLI are DEBUG instead of WARN.
* Web help is always generated when `--help-web` is invoked instead of being cached.
