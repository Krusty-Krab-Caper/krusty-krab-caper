const readline=require("readline"),host="http://localhost:8080",initializeConversationEndpoint=`${host}/conversation`,chatEndpoint=`${host}/chat`,resetChatEndpoint=`${host}/conversation`,rl=readline.createInterface({input:process.stdin,output:process.stdout});function startChat(){rl.question("Who do you want to chat with? ",(async t=>{console.log(`Starting chat with ${t}...`);try{await chatInterface(t)}catch(t){console.log("Error: "+t.message)}finally{process.exit()}}))}async function initializeConversation(t){const e=await fetch(initializeConversationEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({recipient:t})}),o=e.status;if(400===o)throw new Error("Please specify a person to chat with.");if(404===o)throw new Error("That person does not exist in our directory.");return(await e.json()).conversationId}async function chatInterface(t){let e=await initializeConversation(t);for(console.log('\nChat started. At any time, type "#exit" to end the chat, or type "#reset" to reset the chat.\n');;){const o=await new Promise((t=>{rl.question("\nYou> ",(e=>{t(e)}))}));if("#exit"===o.toLowerCase())return console.log("Chat ended."),void rl.close();if("#reset"!==o.toLowerCase())try{const n=await sendMessage(e,o);console.log(`\n${t}> ${n}`)}catch(t){console.error("Error sending message:",t)}else console.log("Resetting chat..."),await deleteConversation(e),e=await initializeConversation(t),console.log("Chat reset.")}}async function deleteConversation(t){return fetch(resetChatEndpoint,{method:"DELETE",body:JSON.stringify({conversationId:t})})}async function sendMessage(t,e){const o=await fetch(chatEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:t,message:e})});return(await o.json()).message}startChat();