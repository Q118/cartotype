# Cartotype
## Prototype of a Shopping Cart with Administrative Capabilities


### Tools intentionally used for groking
1.	custom hooks
    a. `useMultiStepForm`
    b. `useLocalStorage`
2.	context API, 
3.	advanced TypeScript, 
4.	reducing effect dependencies, 
5.	use reducer to extract state logic into
6.	querying a series of state updates (aka batch updates)
7. Multi-step forms with state management
8. Forwarding refs

Aim is to keep components “pure” without overcomplicating modularization.


## Run the app locally
    - go to the root directory
    - `npm install`
    - `npm run dev`
    - go to http://localhost:5173


#### This app is also a collection of agnostic components intended to be able to be plugged into any React app
