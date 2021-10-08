/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {
  Client,
  logger,
} = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = {
  baseUrl: "http://localhost:8080/engine-rest",
  use: logger
};

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'accept_mail'
client.subscribe("accept_mail", async function({ task, taskService }) {
  const mail = task.variables.get("mail");

  console.log("Send accept mail to: "+mail);

  await taskService.complete(task, {});
});

// susbscribe to the topic: 'reject_mail'
client.subscribe("reject_mail", async function({ task, taskService }) {
  const mail = task.variables.get("mail");

  console.log("Send reject mail to: "+mail);

  await taskService.complete(task, {});
});