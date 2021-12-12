# Toasty
Zero dependency notifications in Vanilla JS

## Installation 

1) copy toasty.js into your project
2) include it in your html file
3) done

optional steps:

4) Adjust the CSS at the bottom of the file to your liking

## Usage

The general parameters are ("message", timeoutInSeconds)
If no timeout is given, the message will stay until manually dismissed by the user

Currently there are success, error and info messages implemented:

```
toasty.success("Toasty initialized!");
toasty.info("dependency free is better", 10);
toasty.error("Something went wrong", 10);
```
