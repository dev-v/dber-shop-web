import nprogress from 'nprogress';

class NProgress {
  n = 0;

  inc() {
    nprogress.inc();
    if (this.n < 1) {
      this.n = 1;
    } else {
      ++this.n;
    }
  }

  done() {
    --this.n;
    if (this.n < 1) {
      nprogress.done();
    }
  }
}

const nProgress = new NProgress();

export {nProgress};
