# Goal: To enhance customer ease and improve the usability of the Zowe CLI by designing a graphical user interface (GUI).

## Reasoning:
Many customers struggle with configurations due to the flexibility and complexity of the current system. A GUI will address these issues by:

- Providing relevant information upfront.
- Preventing information overload.
- Offering an easier interface with properties similar to autocomplete in TypeScript.
- Presenting a reactive interface that shows only what is necessary.
- Offering optional, additional explanations.
- Abstracting the `configuration.json` file away from non-superusers.
- Increasing ease of use and adaptability of the product.

## Framework Considerations:
### [Electron](https://www.electronjs.org/)
- **Pros**: Mature, rich feature set, strong Node.js support.
- **Cons**: Large application size, resource-intensive, security concerns.

### [Tauri](https://tauri.app/) 🥇
- **Pros**: Lightweight, security-focused, resource-efficient, integrates with Rust.
- **Cons**: Less mature, limited features, dependent on system webview.

### [NW.js (node-webkit)](https://nwjs.io/)
- **Pros**: Node.js integration, easy to use.
- **Cons**: Similar size and performance issues as Electron, smaller community.

## UI Considerations:
### [Yew (Rust)](https://yew.rs/)
- **Pros**: Rust ecosystem consistency, multi-threaded performance.
- **Cons**: Steeper learning curve, smaller community.

### [Svelte](https://svelte.dev/) 🥇
- **Pros**: Efficient vanilla JS, minimal runtime, reactive programming model.
- **Cons**: Smaller community, learning curve for traditional framework users.

### [Preact](https://preactjs.com/)
- **Pros**: Lightweight, similar to React, good performance.
- **Cons**: Lacks some features, manual optimization needed.

### [Vue.js](https://vuejs.org/)
- **Pros**: Flexible, reactive.
- **Cons**: Larger base size, careful management needed.

### [Alpine.js](https://alpinejs.dev/)
- **Pros**: Lightweight, easy integration.
- **Cons**: Limited for complex applications.

### Vanilla JS
- **Pros**: Ultimate control, best performance.
- **Cons**: More boilerplate, lacks convenience and features.

## Integration with the CLI and IPC Considerations:
### Binding Rust to the CLI:
Using [napi-rs](https://napi.rs/) or [Neon](https://neon-bindings.com/) to create native modules for Node.js.

### IPC Methods:
#### WebSockets:
- **Pros**: Full-duplex communication.
- **Cons**: Unnecessary for infrequent communication.

#### HTTPs:
- **Pros**: Stateless, easy implementation.
- **Cons**: Overhead for frequent messages.

#### Stdin/Stdout:
- **Pros**: Efficient for parent-child process communication.
- **Cons**: Limited flexibility.

#### Named Pipes 🥇:
- **Pros**: Low latency, high throughput.
- **Cons**: Platform-specific complexity.

## Design Strategy:
- **Attempt 1**: Neon module to perform operations and send messages to Tauri.
- **Attempt 2**: Web sockets between CLI and Tauri.
- **Attempt 3**: Stdin/Stdout communication.
- **Attempt 4**: HTTPs communication.
- **Attempt 5** 🥇: Named pipes leveraging existing daemon work.

## Steps Taken During POC Attempts:
- Created bindings and connected the Rust app to the project.
- Partially developed frontend.
- Integrated the GUI into the CLI.
- Demonstrated a GUI with a config init flow.

## Future Considerations:
- Expected difficulties capturing all relevant and possible properties in the GUI.
- Scope of the POC and GUI.

## TO DO 7/29-8/2:
- [X] Named pipes leveraging the preexisting work from our daemon zowe-cli/zowex/src/comm.rs
- [ ] Get selected data into the cli from the UI before it closes (enable dynamism)
    - [ ] Implement a file watcher?
- [ ] Workshop UI on paper/whiteboard
    - [ ] Check with a team member to ensure proper understanding/directionthen
    - [ ] Possibly review it with some UX person?
- [ ] Set up UI with multiple views with svelte frontend
    - [ ] Pick level of nesting (or flat structure?)write out each profile's credentials
    - [ ] Enable a sidebar that shows what's been added (profile name, not all the details)
- [ ] Detect if already have a config
    - [ ] determine if showing gui error popup or cli red error
- [ ] figure out how to populate fields with any defaults


Original Design Document: https://docs.google.com/document/d/1O_Kh8d5py-Emobe-op5IVTBpx0sc2tpo2zJawpNNpx4/edit?usp=sharing 
