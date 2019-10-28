export class LayoutEditorToolArrangeObserverEntry {
  private resize: ResizeObserver = new window.ResizeObserver(
    this.handleResizeObserver.bind(this)
  );
  private intersection = new IntersectionObserver(
    this.handleIntersectionObserver.bind(this),
    {
      root: null,
      rootMargin: "0px",
      threshold: [1]
    }
  );
  private locations = new Map<string, ILocationData>();
  private placeholders: HTMLElement[] = [];
  private placeholdersContainer: HTMLElement;

  constructor(private element: HTMLElement) {
    this.createPlaceholderContainer();
    this.loadLocations();
    this.loadSizes();
    this.loadPlaceholders();
    this.observeResize();
  }

  private loadLocations() {
    const locations = this.element.dataset[Dataset.Locations];

    if (locations) {
      locations.split(" ").forEach(location => {
        this.locations.set(location, {
          height: 0,
          isAvailable: false,
          name: location,
          width: 0
        });
      });
    }
  }

  private loadSizes() {
    const initialLocation = this.getElementLocation();

    let previousLocation = initialLocation;
    this.locations.forEach(data => {
      this.element.classList.remove(previousLocation);
      this.element.classList.add(data.name);

      const rect = this.element.getBoundingClientRect();
      data.width = rect.width;
      data.height = rect.height;

      previousLocation = data.name;
    });
    this.element.classList.replace(previousLocation, initialLocation);
  }

  private observeResize() {
    this.resize.observe(this.element);
  }

  private loadPlaceholders() {
    this.locations.forEach(data => {
      const placeholder = this.createPlaceholder(
        data.name,
        data.width,
        data.height
      );

      this.intersection.observe(placeholder);
      this.placeholders.push(placeholder);
    });
  }

  private updatePlaceholders() {
    this.placeholders.forEach(placeholder => {
      const data = this.locations.get(placeholder.dataset.location);

      placeholder.style.width = `${data.width}px`;
      placeholder.style.height = `${data.height}px`;
    });
  }

  private createPlaceholder(location: string, width: number, height: number) {
    const placeholder = document.createElement("div");

    placeholder.dataset.location = location;
    placeholder.classList.add(this.element.tagName.toLowerCase());
    placeholder.classList.add(location);
    placeholder.style.width = `${width}px`;
    placeholder.style.height = `${height}px`;
    this.placeholdersContainer.appendChild(placeholder);

    return placeholder;
  }

  private createPlaceholderContainer() {
    this.placeholdersContainer = document.createElement("div");
    this.placeholdersContainer.classList.add("gx-le-tool-arrange-container");
    this.element.parentElement.appendChild(this.placeholdersContainer);
  }

  private handleResizeObserver(entries: ResizeObserverEntry[]) {
    entries.forEach(entry => {
      const target = entry.target as HTMLElement;

      if (
        target === this.element &&
        this.element.dataset[Dataset.Visibility] === "visible"
      ) {
        const data = this.locations.get(this.getElementLocation());
        const rect = this.element.getBoundingClientRect();

        if (rect.width !== data.width || rect.height !== data.height) {
          this.loadSizes();
          this.updatePlaceholders();
        }
      }
    });
  }

  private handleIntersectionObserver(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      const target = entry.target as HTMLElement;

      if (this.placeholders.includes(target)) {
        this.locations.get(target.dataset.location).isAvailable =
          entry.intersectionRatio >= 1;
      }
    });

    this.arrange();
  }

  private arrange() {
    let availableLocation: string;

    for (const locationData of this.locations.values()) {
      if (locationData.isAvailable) {
        availableLocation = locationData.name;
        break;
      }
    }

    this.element.classList.remove(...this.locations.keys());
    if (availableLocation) {
      this.element.dataset[Dataset.Visibility] = "visible";
      this.element.classList.add(availableLocation);
    } else {
      this.element.dataset[Dataset.Visibility] = "hidden";
    }
  }

  private getElementLocation(): string {
    let elementLocation;

    for (const location of this.locations.keys()) {
      if (this.element.classList.contains(location)) {
        elementLocation = location;
        break;
      }
    }

    return elementLocation;
  }
  public destroy() {
    this.resize.unobserve(this.element);
    this.placeholders.forEach(placeholder => {
      this.intersection.unobserve(placeholder);
      placeholder.remove();
    });
    this.placeholders = [];
    this.placeholdersContainer.remove();
    this.locations.clear();
  }
}

interface ILocationData {
  height: number;
  isAvailable: boolean;
  name: string;
  width: number;
}

enum Dataset {
  Locations = "gxLeToolArrangeLocations",
  Visibility = "gxLeToolArrangeVisibility"
}
