# Github action to create Windows Installer MSI file

This action create Windows Installer MSI files for the input exe file.

## Precondition
On Windows, Install Wix https://wixtoolset.org/

## Inputs

## exefile, required
what exe file to wrap in the built MSI

## version, optional
what version to use for the built MSI, default is 0.0.1

## Outputs

## eratoscli-win-64.msi and eratoscli-win-32.msi

The Windows installation files for 64-bit and 32-bit Windows

## Example usage
uses: ./.github/action/build-msi
