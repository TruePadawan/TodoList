class EventManager {
    #events;

    constructor()
    {
        this.#events = {};
        console.log('creating event manager object');
    }

    registerEvent(eventName)
    {
        this.#events[eventName] = [];
    }

    registerActionToEvent(eventName, callbackFn)
    {
        const isEventRegistered = this.#events.hasOwnProperty(eventName);

        if (isEventRegistered)
        {
            this.#events[eventName].push(callbackFn);
            return;
        }

        throw "Event Not Registered";
    }

    triggerActions(eventName)
    {
        const isEventRegistered = this.#events.hasOwnProperty(eventName);

        if (isEventRegistered)
        {
          let eventActions = this.#events[eventName];

          eventActions.forEach((action) => {
            action();
          });
        }

        throw "Event Not Registered";
    }
}

export const eventManager = new EventManager();