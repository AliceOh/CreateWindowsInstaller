# Github action to create Windows Installer MSI file

This action create Windows Installer MSI files for the input exe file.

## Inputs

## exefile, required
what exe file to wrap in the built MSI

## version, optional
what version to use for the built MSI, default is 0.0.1

## Outputs

The Windows installation files for the input exe file

## Example usage
```
      - name: Build Windows Installer MSI from exe file
        uses: AliceOh/CreateWindowsInstaller@1.0.0
        with:
          exefile: 'helloworld.exe'
```
a real example is here: https://github.com/AliceOh/ExampleUseWindowsInstallerGithubAction
