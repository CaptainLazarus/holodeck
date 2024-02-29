{
  description = "A development environment for 3D flowchart app";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable"; # Ensure this channel has the Node.js version you need
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs # Adjust to the Node.js version available, e.g., nodejs-20_x or what's available
            yarn # If you prefer Yarn over npm
            # Add system dependencies if needed
          ];

          shellHook = ''
            echo "Welcome to your Node.js development environment. Ready to code!"
            echo "Use npm or yarn to manage Node.js packages like ESLint, Jest, Prettier, etc."
          '';
        };
      });
}
