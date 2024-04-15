import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, PutCommand, DynamoDBDocumentClient,ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const cliente = new DynamoDBClient({region: "sa-east-1"});
const docCliente = new DynamoDBDocumentClient.from(cliente);

export const fetchTareas = async () => {
    const comando = new ScanCommand({ExpressionAttributeNames: {"#nombre":"nombre"},
        ProjectionExpression: "id, #nombre, completada",
        TableName: "Tareas"
    });
    const respuesta = await docCliente.send(comando);
    return respuesta;
};

export const crearTareas = async (nombre, completada) => {
    const uuid = crypto.randomUUID()
    const comando = new PutCommand({
        TableName: "Tareas",
        Item: {
            id:"",
            nombre,
            completada
        }
    });
    const respuesta = await docCliente.send(comando);
    return respuesta;
};

export const modificarTareas = async (id, nombre, completada) => {
    const comando = new UpdateCommand({
        TableName: "Tareas",
        Key: {
            id,
        },
        ExpressionAttributeNames: {
            "#nombre": "nombre"
        },
        UpdateExpression: "set #nombre = :n, completada = :c",
        ExpressionAttributeValues: {
            ":n": nombre,
            ":c": completada
        },
        ReturnValues: "ALL_NEW"
    });
    const respuesta = await docCliente.send(comando);
    return respuesta;
};

export const eliminarTareas = async (id) => {
    const comando = new DeleteCommand({
        TableName: "Tareas",
        Key: {
            id
        },
    });
    const respuesta = await docCliente.send(comando);
    return respuesta;

};
