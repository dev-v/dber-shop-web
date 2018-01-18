import nprogress from 'nprogress';

class NProgress {
  n = 0;

  inc() {
    if (this.n < 1) {
      this.n = 1;
      nprogress.inc();
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
