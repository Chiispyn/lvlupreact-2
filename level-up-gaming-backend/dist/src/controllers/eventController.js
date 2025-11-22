// level-up-gaming-backend/src/controllers/eventController.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get createEvent () {
        return createEvent;
    },
    get deleteEvent () {
        return deleteEvent;
    },
    get getEvents () {
        return getEvents;
    },
    get updateEvent () {
        return updateEvent;
    }
});
const _eventData = require("../data/eventData");
const _uuid = require("uuid");
const _dbUtils = require("../utils/dbUtils");
// 🚨 FUNCIÓN AUXILIAR: Extrae la URL de incrustación del iframe completo
const extractEmbedSrc = (fullCode)=>{
    const match = fullCode.match(/src="([^"]+)"/);
    return match ? match[1] : fullCode.includes('http') ? fullCode : '';
};
// ----------------------------------------------------
// LECTURA (GET)
// ----------------------------------------------------
const getEvents = (req, res)=>{
    try {
        const events = (0, _eventData.getEvents)();
        if (!events) {
            return res.status(200).json([]);
        }
        const sortedEvents = events.sort((a, b)=>new Date(a.date).getTime() - new Date(b.date).getTime());
        res.json(sortedEvents);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor al procesar eventos.'
        });
    }
};
// ----------------------------------------------------
// ADMINISTRACIÓN (CRUD)
// ----------------------------------------------------
// @route   POST /api/events/admin
const createEvent = (req, res)=>{
    try {
        const { title, date, time, location, mapEmbed, notes } = req.body;
        if (!title || !date || !location) {
            return res.status(400).json({
                message: 'Faltan campos obligatorios: título, fecha y ubicación.'
            });
        }
        const finalEmbedUrl = extractEmbedSrc(mapEmbed);
        const newEvent = {
            id: (0, _uuid.v4)(),
            title: title,
            date: date,
            time: time || '18:00',
            location: location,
            mapEmbed: finalEmbedUrl,
            notes: notes || ''
        };
        const events = (0, _eventData.getEvents)();
        events.push(newEvent);
        (0, _dbUtils.writeToDb)('event', events);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor al crear evento.'
        });
    }
};
const updateEvent = (req, res)=>{
    try {
        const { id } = req.params;
        const updateData = req.body;
        const events = (0, _eventData.getEvents)();
        const eventIndex = events.findIndex((e)=>e.id === id);
        if (eventIndex !== -1) {
            const currentEvent = events[eventIndex];
            if (updateData.mapEmbed) {
                updateData.mapEmbed = extractEmbedSrc(updateData.mapEmbed);
            }
            events[eventIndex] = {
                ...currentEvent,
                ...updateData,
                date: updateData.date || currentEvent.date,
                time: updateData.time || currentEvent.time,
                mapEmbed: updateData.mapEmbed !== undefined ? updateData.mapEmbed : currentEvent.mapEmbed,
                notes: updateData.notes !== undefined ? updateData.notes : currentEvent.notes
            };
            (0, _dbUtils.writeToDb)('event', events);
            res.json(events[eventIndex]);
            return;
        }
        res.status(404).json({
            message: 'Evento no encontrado para actualizar.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor al actualizar evento.'
        });
    }
};
// @route   DELETE /api/events/:id/admin
const deleteEvent = (req, res)=>{
    const { id } = req.params;
    let events = (0, _eventData.getEvents)();
    const initialLength = events.length;
    events = events.filter((e)=>e.id !== id);
    (0, _dbUtils.writeToDb)('event', events);
    if (events.length < initialLength) {
        res.status(200).json({
            message: 'Evento eliminado.'
        });
    } else {
        res.status(404).json({
            message: 'Evento no encontrado.'
        });
    }
};
